# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

TO INSTALL
npm install

TO START
npm run dev

Port associated from env: 9000

If occupied -> change env
VITE_DEV_SERVER_PORT={open port}

TO CHECK LINTING ERRORS
npm run lint

Project runs on node version v22.14.0 and nvm
If theres a node issue make sure node is up to date.

nvm use 22 (or other node versions available)

No tasks in the schedule? -> The app filters tasks inside of schedule.json by their time and date, only todays tasks will appear and only if the their scheduled time has not passed.

To see the tasks in schedule, change schedule.json "date: {todays-date}" and maybe hours if necessary
