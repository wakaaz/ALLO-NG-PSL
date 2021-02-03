export interface LearningTutorial {
    id: number;
    icon: string;
    grade: string;
    subjects: Subject[];
}

export interface Subject {
    id: number;
    icon: string;
    title: string;
    grade_id: string;
    videos: number;
}
