import { expect } from 'chai';
import Course from "./Course";
import CourseJson from "./interfaces/CourseJson";
import NextLessonJson from './interfaces/NextLessonJson';
import * as moment from 'moment';

let courseJson: CourseJson;
let expectedNextLessonResult: NextLessonJson;
let notExpectedNextLessonResult: NextLessonJson;

describe("Course next lesson", () => {
    before(() => {
        courseJson = {
            "startDate": moment().add(-1, 'days').format('YYYY-MM-DD'),
            "endDate": moment().add(1, 'days').format('YYYY-MM-DD'),
            "startTime": "09:00",
            "endTime": "12:00",
            "weekDays": [ moment().add(-1, 'days').format('dddd'), moment().add(1, 'days').format('dddd')]
        }

        expectedNextLessonResult = { startTime: courseJson.startTime, endTime: courseJson.endTime, date: courseJson.endDate };
        notExpectedNextLessonResult = { ...expectedNextLessonResult, date: courseJson.startDate };

    })

    it("should success", () => {
        const course: Course = new Course(courseJson);
        const nextLesson = course.getNextLesson();
        expect(nextLesson).to.eql(expectedNextLessonResult);
    });

    it("should fail", async () => {
        const course: Course = new Course(courseJson);
        const nextLesson = course.getNextLesson();
        
        expect(nextLesson).not.eql(notExpectedNextLessonResult);
    });
});
