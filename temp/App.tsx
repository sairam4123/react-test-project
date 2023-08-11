// Some what like this
interface TaskData {
    id: string;
    title: string;
    content: string;
    completed: boolean;
    createdAt: Date;
}

interface TaskProps {
    task: TaskData;
    className: string;
}

// Why cant I just define the types near the props itself? Like I used to do previously what good does this do..
// it is not a rule a such just a convention to keep the code clean
// Oh I see..

// Can we move to the functionality of the app? Since it needs at most attention..

function Task({ task, className }: TaskProps) {
    return (
        <p
            className={tailwindMerge(
                className,
                `${task.completed && "line-through"}`,
            )}>
            {task.title}
        </p>
    );
}

function useTasks() {
    const [tasks, setTasks] = useState([]); // can be from global context

    // I actually mixed up both of them ..
    function addTask(task: Omit<TaskData, "id">) {
        setTasks([
            ...tasks,
            {
                ...task,
                id: `${+new Date()}`, // use uuid or cuuid
            },
        ]);
    }

    function removeTask(taskId: TaskData["id"]) {
        setTasks(tasks.filter((t) => t.id !== taskId));
    }

    function toggleTask(taskId: TaskData["id"]) {
        setTasks(
            tasks.map((t) =>
                t.id === taskId ? { ...t, completed: !t.completed } : t
            )
        );
    }

    function updateTask(
        taskId: TaskData["id"],
        task: Pick<TaskData, "title" | "content">
    ) {
        setTasks(tasks.map((t) => (t.id === taskId ? { ...t, ...task } : t)));
    }

    // probably this search should be part of the TasksList itself

    /* TasksList
- <SearchBar />
- map over the filtered tasks
  - render each Task
*/

    // Can you see the server? Access the server I mean..
    // it keeps loading and loading
    // how should I fix it?

    // there is a tool to expose a local port to the internet. let me check it.
    // yes the tool is called **ngrok**
    // I'll install it tomorrow
    // How editing would work, my approach for it is good?
    // Oh so a seperate method for toggle is good? No need for entire task.. um nice..
    // I actually did not no about it
    // what does pick do? - only takes the subset of given types from the larger type i.e take title, content from TaskData
    // wow expierence does speak it seems, can it be richer than this, just asking..
    // probably using an external state manager is best when using arrays cuz with react state its not mutable so there is lot
    // of code like setTasks(tasks.map(.......)) or [...tasks] which is difficult to read but thats the way with react state
    // so i have to create a new folder called hooks and set up the useTasks?
    // yes generally all the functionality is in a custom hook and then react/xml is used for styling and connecting functions and passing props
    // that is one way i find clean. but normally redux is also used although there is a lot of boilerplate such as defining the each of the actions and reducers
    // like how i have done currently alright whatelse can be improved? the colours look terrible, but i dont know how to pick them up properly
    // that is job of ui designer there is no fixed rule. there are some palletes online and you can also see mockups on sites like dribble and figma
    // i mean ur color choice was actually good
    // figma also has a dev mode that direcly gives you the tailwindcss classes. for my styles i use tailwind-ui and flowbite and try to mix and match to keep a consistent design

    // at the start/ my/  sdeosi gnms wy erc quite bad but slowly you get used to figma

    // so what changes are to be made
    // refactors the search and edit functionality, make components readable and flexible so user can add custom classes too
    // add animations, SEO, server side rendering, caching, accessibility, testing, dark mode, mobile responsiveness, localication/translation,
    // loading indicator (assuming data is coming from database), or store data locally using localStorage, multiple themes, are some i can think of right now
    // note: probably adding all of these wouldnt make sense. most of the existing sites skip many of these. so it depends how much time you have
    // i would probably need a lot o help from u
    /// i'll make the refactor and you guide me through

    // unfortunately i dont have that much time. my suggestion would be first before coding watch a couple of youtube videos so you get the gist of how things work and what are the followed practices. then read up on the docs: react, tailwind, / whatever packages you use. Then goto github and search for opensource projects that use the techstack eg. cal.com, many of vercel example projects. they follow industry standards and also give starting templates. then you can start coding and if you get stuck try chatgpt cuz it gives the fastest answers. that is how i learnt. except that i used stackoverflow when stuck. also another suggestino would be to learn backedn development simulatenously otherwise having only frontend is not useful
    // well.. i actually know backend, that rest api i built, im thinking of doing it soon
    //  then try to integrate this app with a rest api that stores the tasks on db, add authentication, multiple lists, etc
    // i was thinking of a passwordless aproach for login using sso (single sign on)
    // i havent implemented sso but many providers have that: clerk, supabase, firebase
    // for db do u think firebase is good enough, i'm thinking of diving into NoSQL
    // initially firebase is good, but im not sure how well it performs with search. the benefit of firebase is that it has realtime updates
    // i used mongodb for this as there are not many relationships

    // mern means mongo expressjs react and nodejs right?yes so like learning backend with js will help me prolly
    // not neccessarily many ppl use flask backend with react. all you need is rest api for it. even some mock
    // when calling rest apis, is it better to use reducers? i think reducers are cool..
    // i havent used redux in a while, now i use context itself and hooks i actually watched this tutorial https://youtu.be/_1QtdnqHq8I
    // the todolist i built was actually for an internship at a startup. ps. i was selected for 2month internship with that and it was before i knew typescript
    // and i followed multiple blogs and made this mess haha
    // some good youtubers are: lama dev, webdevcody, josh tried coding, theo.gg, ben awad, web dev simplified, traversey media.  i learnt python from telusko, and is there any scope left for good old java? yes very much used even now. java specially threads, jsp
    // im gonna be doing some dsa a little bit of react and backend dev

    // probably also see the date of publish of the video, try to learn in 1-2yr old video. some youtubers have really old videos that used older react conm
    // s like class-based components, yeah ik that
    // ok have to go. bye
    return { tasks, addTask, removeTask, toggleTask };
}

const TasksList = () => {

    const [searchTask, setSearchTask] = useState("");

    const filtceptredTasks = tasks.filter(task=>task.title.toLowerCase().includes(searchTask.toLowerCase()));
    
    return (
        <div className="flex flex-col gap-2">
            {/* Search */}
            <div className="mb-2">
                <input type="text" placeholder="Search" value={searchTask} onChange={(e)=>setSearchTask(e.target.value)} />
            </div>

            {/* Tasks */}
            <div className="flex flex-col gap-2">
                {filteredTasks.map(task=>(<Task key={task.id} task={task} />))}
            </div>
        </div>
    )
}

const App = () =>{
    return (
    <div>
        <h1>Todo List App</h1>
        <TasksList />    
    </div>)
}

export default App

// I should probably move to fuzzy search right?
// you would need a package for that

// How should I design a good reusable component?
// there isnt a fixed design it is based on incrementally improving the component as needed