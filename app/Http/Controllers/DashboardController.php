<?php

namespace App\Http\Controllers;

use App\Models\DetailSchedule;
use App\Models\DetailScore;
use App\Models\HeaderSchedule;
use App\Models\SchoolClass;
use App\Models\Student;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function admin(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'total_teacher' => Teacher::count(),
                'total_student' => Student::count(),
                'total_class' => SchoolClass::count(),
                'schedule_finalized' => HeaderSchedule::where('finalize', true)->count(),
                'schedule_draft' => HeaderSchedule::where('finalize', false)->count(),
            ],
            'recentActivities' => DetailScore::with(['student', 'detailSchedule.subject'])
                ->latest()->take(5)->get()
                ->map(fn($score) => [
                    'title' => "Nilai {$score->student?->name} - {$score->detailSchedule?->subject?->name}",
                    'time' => $score->created_at->diffForHumans(),
                ]),
        ]);
    }

    public function teacher(Request $request): Response
    {
        $teacher = $request->user()->teacher;
        $scheduleIds = DetailSchedule::where('teacher_id', $teacher?->id)->pluck('id');

        return Inertia::render('Teacher/Dashboard', [
            'stats' => [
                'total_teaching_hours' => $scheduleIds->count(),
                'total_subject' => DetailSchedule::where('teacher_id', $teacher?->id)
                    ->distinct('subject_id')->count('subject_id'),
                'total_score_input' => DetailScore::whereIn('detail_schedule_id', $scheduleIds)->count(),
            ],
            'recentActivities' => DetailScore::whereIn('detail_schedule_id', $scheduleIds)
                ->with(['student', 'detailSchedule.subject'])
                ->latest()->take(5)->get()
                ->map(fn($score) => [
                    'title' => "Input nilai {$score->student?->name} - {$score->detailSchedule?->subject?->name}",
                    'time' => $score->created_at->diffForHumans(),
                ]),
        ]);
    }

    public function student(Request $request): Response
    {
        $student = $request->user()->student;
        $scores = DetailScore::where('student_id', $student?->id)->with('detailSchedule.subject')->get();

        return Inertia::render('Student/Dashboard', [
            'stats' => [
                'total_subject' => $scores->pluck('detailSchedule.subject_id')->unique()->count(),
                'average_score' => round(
                    $scores->avg(fn($s) => (($s->assignment ?? 0) + ($s->mid_exam ?? 0) + ($s->final_exam ?? 0)) / 3),
                    1
                ),
                'class_name' => $student?->detailClasses?->first()?->schoolClass?->name ?? '-',
            ],
            'recentActivities' => $scores->sortByDesc('created_at')->take(5)->values()->map(fn($score) => [
                'title' => "Nilai {$score->detailSchedule?->subject?->name} diperbarui",
                'time' => $score->created_at->diffForHumans(),
            ]),
        ]);
    }
}
