import { gql } from "@apollo/client";

export const COURSES_QUERY = gql`
  query {
    getCourses(
      filter: {
        time5: "123456"
        time4: "123456789"
        time1: "12345678"
        time2: "12345678"
      }
    ) {
      courseName
      semester
      designatedFor
      professor
      course_code
      id
      class
      credit
      fullHalf
      day1
      day2
      day3
      day4
      day5
      day6
      time1
      time2
      time3
      time4
      time5
      time6
      people
      peopleChosing
      classroom
      add
      remark
      ceiba
      description
      objective
      school
      group
      commonRequired
      otherCourse
      general
      hot
      tags
    }
  }
`;

// query getCourses(
//   $courseName: String
//   $semester: String
//   $designatedFor: String
//   $professor: String
//   $course_code: String
//   $id: String
//   $class: String
//   $day1: Boolean
//   $day2: Boolean
//   $day3: Boolean
//   $day4: Boolean
//   $day5: Boolean
//   $day6: Boolean
//   $time1: String
//   $time2: String
//   $time3: String
//   $time4: String
//   $time5: String
//   $time6: String
//   $people: String
//   $peopleChosing: Int
//   $classroom: String
//   $add: String
//   $school: String
//   $group: String
//   $commonRequired: String
//   $otherCourse: String
//   $general: String
//   $hot: Int
//   $tags: String
// ) {
//   getCourses(
//     filter: {
//       serialNumber: $serialNumber
//       courseName: $courseName
//       semester: $semester
//       designatedFor: $designatedFor
//       professor: $professor
//       courseCode: $courseCode
//       id: $id
//       class: $class
//       day1: $day1
//       day2: $day2
//       day3: $day3
//       day4: $day4
//       day5: $day5
//       day6: $day6
//       time1: $time1
//       time2: $time2
//       time3: $time3
//       time4: $time4
//       time5: $time5
//       time6: $time6
//       people: $people
//       peopleChosing: $peopleChosing
//       classroom: $classroom
//       add: $add
//       school: $school
//       college: $college
//       group: $group
//       commonRequired: $commonRequired
//       otherCourse: $otherCourse
//       general: $general
//       hot: $hot
//       tags: $tags
//     }
//   ) {
//     courseName
//     semester
//     designatedFor
//     professor
//     course_code
//     id
//     class
//     credit
//     fullHalf
//     day1
//     day2
//     day3
//     day4
//     day5
//     day6
//     time1
//     time2
//     time3
//     time4
//     time5
//     time6
//     people
//     peopleChosing
//     classroom
//     add
//     remark
//     ceiba
//     description
//     objective
//     school
//     group
//     commonRequired
//     otherCourse
//     general
//     hot
//     tags
//   }
// }
