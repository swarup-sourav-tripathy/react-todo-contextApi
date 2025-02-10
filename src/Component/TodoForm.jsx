import React, { useState } from "react";
import { useTodo } from "../Contexts";
import { Calendar1 } from "lucide-react";
import { Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"
import { useForm } from "react-hook-form";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import PolylineIcon from '@mui/icons-material/Polyline';
import { DatePickerWithPresets } from "./DatePicker";
import ResponsiveTimePickers from "./TimePicker";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Clock } from "lucide-react";
import { PopoverClose } from "@radix-ui/react-popover";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import TodoItem from "./TodoItem";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme } from '@/components/theme-provider';
import { useEffect } from "react";
import { DndContext, KeyboardSensor, PointerSensor, TouchSensor, closestCorners, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'


function TodoForm() {
    const [todo, setTodo] = useState("")
    const { addTodo } = useTodo()
    const { register, handleSubmit } = useForm()
    const [subTodo, setSubTodo] = useState("")
    const { theme } = useTheme()
    const [resolvedTheme, setResolvedTheme] = useState(theme);
    const [subTasks, setSubTasks] = useState([
        { id: 1, todo: "Sub-Todo 1", completed: false },
        { id: 2, todo: "Sub-Todo 2", completed: false },
        { id: 3, todo: "Sub-Todo 3", completed: false },
    ])

    useEffect(() => {
        if (theme === "system") {
            const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            setResolvedTheme(isDark ? "dark" : "light");
        } else {
            setResolvedTheme(theme);
        }
    }, [theme]);

    const getTodoPos = (id) => {
        const pos = subTasks.findIndex((todo) => todo.id === id)

        return pos;
    }

    const handleDragEnd = (event) => {
        const { active, over } = event

        if (active.id === over.id) return;
        setSubTasks((tasks) => {
            const originalPos = getTodoPos(active.id)
            const newPos = getTodoPos(over.id)

            return arrayMove(tasks, originalPos, newPos);
        })

    }

    let inputTheme;
    if (theme === 'dark') {
        inputTheme = createTheme({
            palette: {
                mode: 'dark',
            },
        });
    } else if (theme === 'system') {
        inputTheme = createTheme({
            palette: {
                mode: resolvedTheme,
            },
        });
    }
    else {
        inputTheme = createTheme({
            palette: {
                mode: 'light',
            },
        });
    }

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const add = (e) => {
        e.preventDefault()

        if (!todo.trim()) return alert("Provide a proper todo")

        addTodo({ todo, completed: false })
        setTodo("")
    }

    const submit = () => {

    }

    return (
        <>
            <Drawer modal={false}>
                {/* Floating Action Button (FAB) */}
                <DrawerTrigger>
                    <div className="fixed bottom-6 right-6 animate-bounce">
                        <Fab size="medium" color="primary" aria-label="add" className="bg-blue-500 text-white hover:bg-blue-600">
                            <AddIcon />
                        </Fab>
                    </div>
                </DrawerTrigger>

                {/* Drawer Content */}
                <DrawerContent className="p-5 bg-white dark:bg-gray-900 rounded-t-2xl shadow-lg w-full max-w-2xl mx-auto">
                    {/* Drawer Header */}
                    <DrawerHeader className="text-left -ml-4">
                        <DrawerTitle className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                            Add Your Todo!
                        </DrawerTitle>
                        <DrawerDescription className="text-gray-600 dark:text-gray-300 mt-1 text-sm">
                            Organize your tasks efficiently.
                        </DrawerDescription>
                    </DrawerHeader>

                    {/* Input Field */}
                    <form onSubmit={handleSubmit(submit)} className="space-y-3 mt-4">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block">
                            Category Name
                        </label>

                        <ThemeProvider theme={inputTheme}>
                            <Box
                                component="form"
                                sx={{ '& > :not(style)': { mr: 2, ml: 0, width: '73ch' } }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField
                                    type="text"
                                    id="outlined-basic"
                                    label="Add your todo"
                                    value={todo}
                                    onChange={(e) => setTodo(e.target.value)}
                                    variant="outlined"
                                    {...register("todo")}
                                />
                            </Box>
                        </ThemeProvider>
                    </form>

                    {/* Action Buttons (Calendar & Sub-Todos) */}
                    <div className="flex justify-start mt-6 space-x-3">
                        {/* Calendar Dialog */}
                        <Dialog modal={false}>
                            <DialogTrigger>
                                <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-100 dark:hover:bg-gray-700">
                                    <Calendar1 className="w-4 h-4" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="p-5 mt-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                                <DialogHeader>
                                    <DialogTitle className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                                        Scheduler
                                    </DialogTitle>
                                    <DialogDescription className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                                        <div className="flex flex-col space-y-2">
                                            <div className="flex items-center">
                                                <span className="mr-2">Date:</span>
                                                <DatePickerWithPresets />
                                            </div>
                                            <div className="flex items-center">
                                                <span className="mr-2">Time:</span>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button variant="outline" className="border-none w-[240px] flex font-thin justify-start">
                                                            <Clock /> Pick a time
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto">
                                                        <ResponsiveTimePickers />
                                                        <PopoverClose asChild>
                                                            <Button variant="ghost" className="mt-2 text-sm">Close</Button>
                                                        </PopoverClose>
                                                    </PopoverContent>
                                                </Popover>
                                            </div>
                                        </div>
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="outline" className="border-gray-400 text-gray-700 dark:border-gray-600 dark:text-gray-300 text-sm">
                                            Done
                                        </Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        {/* Sub-Todos Drawer */}
                        <Dialog>
                            <DialogTrigger>
                                <Button variant="outline" className="border-green-500 text-green-500 hover:bg-green-100 dark:hover:bg-gray-700">
                                    <PolylineIcon className="w-4 h-4" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="p-5  bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                                <DialogHeader>
                                    <DialogTitle className="text-lg font-semibold text-green-600 dark:text-green-400">
                                        Sub-todos!
                                    </DialogTitle>
                                    <DialogDescription className="text-sm text-gray-600 dark:text-gray-300">
                                        <div className="flex flex-row flex-wrap items-end justify-between">
                                            <ThemeProvider theme={inputTheme}>
                                                <Box
                                                    component="form"
                                                    sx={{ '& > :not(style)': { m: 1, width: '45ch' } }}
                                                    noValidate
                                                    autoComplete="off"
                                                >
                                                    <TextField id="standard-basic" label="Enter SubTodos!" variant="standard" />
                                                </Box>
                                            </ThemeProvider>
                                            <Button variant="outline" className="border-green-500 mb-1 text-green-500 hover:bg-green-100 dark:hover:bg-gray-700">
                                                Add
                                            </Button>

                                            <Card className="border w-full mt-2 border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 shadow-lg rounded-lg p-4">
                                                <CardHeader>
                                                    <div className="flex justify-between items-start">
                                                        <div className="flex flex-col">
                                                            <CardTitle className="text-md font-medium text-gray-700 dark:text-gray-200">Your Sub-Todos!</CardTitle>
                                                            <CardDescription className="text-sm text-gray-500 dark:text-gray-400">Manage subTodos as per required.</CardDescription>

                                                        </div>
                                                        <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-100 dark:hover:bg-gray-700">
                                                            Ask AI
                                                        </Button>

                                                    </div>
                                                </CardHeader>
                                                <CardContent>

                                                    <div className="flex flex-col space-y-2">
                                                        <DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
                                                            {subTasks.map((subTodo) => (
                                                                <SortableContext items={subTasks} strategy={verticalListSortingStrategy}>
                                                                    <div key={subTodo.id} className='w-full'>
                                                                        <TodoItem todo={subTodo} />

                                                                    </div>
                                                                </SortableContext>
                                                            ))}
                                                        </DndContext>
                                                    </div>


                                                </CardContent>
                                                <CardFooter className="text-right text-gray-600 dark:text-gray-400">
                                                    <Button variant="outline" className="border-green-500 text-green-500 hover:bg-green-100 dark:hover:bg-gray-700">  Save </Button>
                                                </CardFooter>
                                            </Card>
                                        </div>
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <DialogClose>
                                        <Button variant="outline" className="border-gray-400 text-gray-700 dark:border-gray-600 dark:text-gray-300 text-sm">
                                            Done
                                        </Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                    </div>

                    {/* Footer Close Button (Centered & Appropriate Width) */}
                    <DrawerFooter className="mt-6 flex justify-center">
                        <DrawerClose asChild>
                            <Button variant="outline" className="border-red-700 text-red-700 dark:border-red-600 dark:text-red-300 md:w-[100px] w-[120px] md:ml-60 ml-24 text-sm">
                                Close
                            </Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>






        </>

    );
}

export default TodoForm;

