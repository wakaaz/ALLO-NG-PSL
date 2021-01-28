export interface TeacherTutorial {
    id: number;
    icon: string;
    grade: string;
    subjects: Subject[];
}

interface Subject {
    id: number;
    icon: string;
    title: string;
    grade_id: string;
    videos: number;
}
