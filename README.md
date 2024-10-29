# FileSafe
A web client has to be smart when handling files.
Your project goal is to build a simple web application that is a file safe based on the project requirements. Then present it during a code review.
Estimated minimum project time at home: 8 hours

## Code Review Criteria
- Definition of Done
- Code Maintainability
- Requirements Achieved
- Thought Process

## Requirements

### Upload File to a File Safe (1 of 2)
<sub>(Minimum Expectation)</sub>
- Web application without a backend.
- Create a view that has a logged in and logged out state. Can be simplified to a simple button in memory state.
- After logging in, the logged out state should be reached after 5 minutes of inactivity in a session timer service. A click is considered an activity.

### Upload File to a File Safe (2 of 2)
<sub>(Minimum Expectation)</sub>
- In the logged in view, there should be a flat list of files. Without a backend, the files can be mocked.
- Add capability to upload files. Without a backend, you can store the files in memory.
- Extend session timer to take upload as an activity and postpone logout if no activity after upload. This means periodically renewing the session while uploading.

### Optional Use Cases
<sub>These are nice-to-haves and are not required</sub>
- Implement a basic backend
- Using RESTful services
- Nice user experience with SCSS
- End-to-end tests with Cypress
- Unit tests
- Encrypt data in session or at rest
- GitLab CI pipeline with linters and coverage
- ...anything else you feel could demonstrate your skill. Please point it out during the code review.

## Angular
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.10.

### Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests
Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Further help
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
