import CourseJson from "./interfaces/CourseJson"
import NextLessonJson from "./interfaces/NextLessonJson";

export default class Course {
    readonly startDate: Date;
    readonly endDate: Date;
    readonly startTime: string;
    readonly endTime: string;
    readonly weekDays: Array<number>;

    constructor(courseJson: CourseJson) {
        const weekdaysNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const courseStartTime = courseJson.startTime.split(":").map(function (time) { return parseInt(time); });
        const courseEndTime = courseJson.endTime.split(":").map(function (time) { return parseInt(time); });

        this.weekDays = courseJson.weekDays.map(function (weekday) { return weekdaysNames.indexOf(weekday); });

        this.startDate = new Date(courseJson.startDate);
        this.endDate = new Date(courseJson.endDate);
        this.startDate.setHours(courseStartTime[0], courseStartTime[1]);
        this.endDate.setHours(courseEndTime[0], courseEndTime[1]);

        this.startTime = courseJson.startTime;
        this.endTime = courseJson.endTime;
    }

    getNextLesson(): NextLessonJson | null {

        const today = new Date();

        if (today > this.endDate)
            return null;


        const nextLesson: NextLessonJson = {
            startTime: this.startTime,
            endTime: this.endTime,
            date: ''
        }

        const nextLessonDate = new Date(this.startDate.toString());
        const nextLessonDayOfWeek = this.getNextLessonDayOfWeek(this.weekDays, this.startTime)
        const referenceDate = today < this.startDate ? this.startDate : today;
        const distance = (nextLessonDayOfWeek + 7 - referenceDate.getDay()) % 7;

        nextLessonDate.setDate(referenceDate.getDate() + distance);

        if (nextLessonDate > this.endDate)
            return null;

        nextLesson.date = nextLessonDate.toISOString().split('T')[0];

        return nextLesson;
    }

    private getNextLessonDayOfWeek(courseWeekdays: Array<number>, courseStartTime: string) {
        const now = new Date();
        const tempStartTime = new Date();
        const todayDayOfWeek = now.getDay();

        courseWeekdays.sort();
        const courseStartTimeArr = courseStartTime.split(":").map(function (time) { return parseInt(time); });

        tempStartTime.setHours(courseStartTimeArr[0], courseStartTimeArr[1]);

        for (const day of courseWeekdays) {
            if (day > todayDayOfWeek || (day == todayDayOfWeek && tempStartTime > now))
                return day;
        }

        return courseWeekdays[0];
    }
}