# Franke

## Frontend Stream for Franke

### Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `npm build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

Reach out to the developers team

## Merge Requests

Merge Requests to `develop` require the minimum of 1 approval by at least one `maintainer` or `owner`

Merge Requests to `master` require the minimum of 1 approval by at least one `maintainer` or `owner` and are only performed by `maintainers`

The development is feature branch oriented the branch naming should match the id for the task ticket in Jira

Revision branch's should follow the convention [TICKET-ID].[REV_NUMBER]-[SHORT DESCRIPTION]

When performing Merge Requests, please make use of the `default` template available.

## Commit Messages

Commit messages should follow the `Conventional Commits` specification https://www.conventionalcommits.org/en/v1.0.0/

Please consider using the [commitizen-cli](https://github.com/commitizen/cz-cli) with the `cz-conventional-changelog` adapter (just follow along the page documentation).

This commit format is enforced by husky when creating a commit in the repo.

## Linter

For static type checking and code analysis we'll use the linter in the project. In order to run this effectively, husky is set up to run the linter and if some error is present in the code, the linter will show the errors.

These checks happen at commit time, only allowing the commit to follow through if the linter passes.

## Code Styleguide

For the most part this project follow the [Official Angular Styleguide](https://angular.io/guide/styleguide)

## Changelog

When we deploy into production (most likely using git tags), we can generate our changelog with this tool:

> https://github.com/conventional-changelog/conventional-changelog

It will allow to read the repo commit and MR history and create the changelog accordingly for the newly created tag.

## I18n

Requirements to update/get Airtable translations:

```bash
$ npm install --save-dev airtable
```

```bash
$ npm install --save-dev flat
```

```bash
$ export AIRTABLE_API_KEY="key0NDX8oA3369oAv"
```

```bash
$ export AIRTABLE_BASE="appO3hlDxAHVtDaI7"
```

Update Airtable keys:

```bash
$ npm run update:airtable
```

Get Airtable keys values from other languages

```bash
$ npm run update:translations
```

## Folder Structure

The folder structure is inspired by this great [article](https://itnext.io/choosing-a-highly-scalable-folder-structure-in-angular-d987de65ec7) by Mathis Garberg.
You can find out more in his [repository](https://github.com/mathisGarberg/angular-folder-structure)

```
|-- app
     |-- modules
       |-- home
           |-- [+] components
           |-- [+] pages
           |-- home-routing.module.ts
           |-- home.module.ts
     |-- core
       |-- [+] authentication
       |-- [+] guards
       |-- [+] http
       |-- [+] interceptors
       |-- [+] mocks
       |-- [+] services
       |-- core.module.ts
       |-- ensureModuleLoadedOnceGuard.ts
       |-- logger.service.ts
     |
     |-- layout
       |-- [+] footer
       |-- [+] header
       |-- [+] modal-layout
     |
     |-- shared
          |-- [+] components
          |-- [+] directives
          |-- [+] pipes
          |-- [+] models
     |
     |-- [+] configs
|-- assets
     |-- scss
          |-- [+] partials
          |-- _base.scss
          |-- styles.scss
```

## Useful Links

### Spartacus

- [Spartacus Docs](https://sap.github.io/spartacus-docs/)
- [Spartacus Repo](https://github.com/SAP/spartacus)
- [Spartacus Slack Workspace](https://join.slack.com/t/spartacus-storefront/shared_invite/enQtNDM1OTI3OTMwNjU5LTg1NGVjZmFkZjQzODc1MzFhMjc3OTZmMzIzYzg0YjMwODJiY2YxYjA5MTE5NjVmN2E5NjMxNjEzMGNlMDRjMjU)
- [Spartacus on Stackoverflow](https://stackoverflow.com/questions/tagged/spartacus-storefront)
- [Spartacus Florian Presentation](https://kibpgmbh-my.sharepoint.com/:b:/g/personal/l_oliveira_xgeeks_io/EUFgloeR-xdAqEb34ViyDI4B8Ktvd93-5z28CSiyoJPacw?e=GaJf3s) (Important to read)

### Franke

- [Franke B2B](https://webshop.franke.com/b2b/b2b-de/en/)
- [Franke B2C](https://webshop.franke.com/b2c/b2c-ch/de_CH/)
