require('dotenv').config()
const fetch = require('node-fetch')
const nbTasks = parseInt(process.env.TASKS) || 20

const randInt = (min, max) => Math.floor(Math.random() * (max - min)) + min
const taskType = () => (randInt(0, 2) ? 'mult' : 'add')
const args = () => ({ a: randInt(0, 40), b: randInt(0, 40) })

const generateTasks = i =>
  new Array(i).fill(1).map(_ => ({ type: taskType(), args: args() }))

let workers = ['http://host.docker.internal:8080','http://host.docker.internal:8081']

let workers_add = ['http://host.docker.internal:8080']
let workers_mult = ['http://host.docker.internal:8081']

let tasks = generateTasks(nbTasks)
let taskToDo = nbTasks

const wait = mili => new Promise((resolve, reject) => setTimeout(resolve, mili))

const sendTask = async (worker, task) => {
  console.log(`${worker}/${task.type}`, task)
  if (task.type==="add"){
    workers_add = workers_add.filter(w => w !== worker)
  } else {
    workers_mult = workers_mult.filter(w => w !== worker)
  }
  tasks = tasks.filter(t => t !== task)
  const request = fetch(`${worker}/${task.type}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task.args),
  })
    .then(res => {
      if (task.type==="add"){
        workers_add = [...workers_add, worker]
      } else {
        workers_mult = [...workers_mult, worker]
      }
      return res.json()
    })
    .then(res => {
      taskToDo -= 1
      console.log(task, 'has res', res)
      return res
    })
    .catch(err => {
      console.log(task, ' failed')
      tasks = [...tasks, task]
    })
}

const main = async () => {
  console.log(tasks)
  while (taskToDo > 0) {
    await wait(100)
    if (workers.length === 0 || tasks.length === 0) continue
    // sendTask(workers[0], tasks[0])
    const task = tasks[0]
    if (task.type === "add"){
      sendTask(workers_add[0], task)
    } else {  // mult
      sendTask(workers_mult[0], task)
    }
  }
}

main()
