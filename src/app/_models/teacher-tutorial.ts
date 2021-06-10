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
export interface VideoList {
    id: number;
    grade_id: number;
    duration: string;
    title: string;
    youtube_link: string;
    vimeo_link: string;
}
