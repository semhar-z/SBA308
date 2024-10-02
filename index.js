// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];
  


      // Main function to process learner data

     function getLearnerData(courseInfo, assignmentGroup, learnerSubmissions) {

    // Validate input data

      if (assignmentGroup.course_id !== courseInfo.id) {
        throw new Error("Invalid input: AssignmentGroup does not belong to the specified course.");
      }
    
      const result = [];
      const currentDate = new Date();

    // Process each learner's submissions
      for (let i = 0; i < learnerSubmissions.length; i++) {
        const submission = learnerSubmissions[i];
        let learnerData = findLearnerData(result, submission.learner_id);

        if (!learnerData) {

          learnerData = {
            id: submission.learner_id,
            totalScore: 0,
            totalWeight: 0,
          };

          result.push(learnerData);
        }

        const assignment = findAssignment(assignmentGroup.assignments, submission.assignment_id);

        if (!assignment) {
          continue;
        }
        const dueDate = new Date(assignment.due_at);

        if (dueDate > currentDate) {
          continue;
        }

        let score = submission.submission.score;
        const submittedAt = new Date(submission.submission.submitted_at);


    // Apply late submission penalty

        let latePenalty = 0.1;

        if (submittedAt > dueDate) {
          score -= (latePenalty * assignment.points_possible);
        }

        let percentage = 0;

        if (assignment.points_possible > 0) {
          percentage = score / assignment.points_possible;
        } else 
       
        return null;

        learnerData.totalScore = learnerData.totalScore + (percentage * assignment.points_possible);
        learnerData.totalWeight = learnerData.totalWeight + assignment.points_possible;
        
        // learnerData.scores[assignment.id] = percentage;

        learnerData[assignment.id] = percentage;
      }
      

        // Calculate averages and format result

        result.forEach(learner => {

        learner.avg = learner.totalWeight > 0 ? (learner.totalScore / learner.totalWeight) * 100 : 0;
        delete learner.totalScore;
        delete learner.totalWeight;   
         
         });

           return result;
       }  


           // Helper function to find a learner's data in the result array

        function findLearnerData(array, learnerId) {
         return array.find(learner => learner.id === learnerId) || null;
        }
            // Helper function to find an assignment in the assignments array

         function findAssignment(assignments, assignmentId) {
          for (let i = 0; i < assignments.length; i++) {
           if (assignments[i].id === assignmentId) {
          return assignments[i];
          }
         }  

         return null;
         }

        // the output is correct but not in the order expected 

          let result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

          console.log(result); 

    
  


