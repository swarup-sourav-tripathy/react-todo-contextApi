import React from 'react'
import { useState, useEffect } from 'react'
import TodoForm from './TodoForm'
import TodoItem from './TodoItem'
import { TodoProvider } from '@/Contexts'
import Container from './conatiner/Container'
import { DndContext, KeyboardSensor, PointerSensor, TouchSensor, closestCorners, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"



function Todo() {
    const [todos, setTodos] = useState([])

    const [tasks, setTasks] = useState([
        { id: 1, todo: "Todo 1", completed: false },
        { id: 2, todo: "Todo 2", completed: false },
        { id: 3, todo: "Todo 3", completed: false },
        { id: 4, todo: "Todo 4", completed: false },
    ])

    const addTodo = (todo) => {
        setTodos((prev) => [...prev, { id: Date.now(), ...todo }])
    }

    const updateTodo = (id, todo) => {
        setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
    }

    const deleteTodo = (id) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id))
    }

    const toggleComplete = (id) => {
        setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo))
    }

    useEffect(() => {

        const todos = JSON.parse(localStorage.getItem("Todos"))
        // console.log(todos);
        // console.log(typeof todos);
        if (todos && Object.keys(todos).length > 0) {
            setTodos(todos)
        }
    }, [])


    useEffect(() => {
        localStorage.setItem("Todos", JSON.stringify(todos))
    }, [todos])

    const getTodoPos = (id) => {
        const pos = tasks.findIndex((todo) => todo.id === id)

        return pos;
    }

    const handleDragEnd = (event) => {
        const { active, over } = event

        if (active.id === over.id) return;
        setTasks((tasks) => {
            const originalPos = getTodoPos(active.id)
            const newPos = getTodoPos(over.id)

            return arrayMove(tasks, originalPos, newPos);
        })

    }

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250, // Delay before dragging starts (in milliseconds)
                tolerance: 5, // Tolerance for touch movement (in pixels)
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    // const sensors = useSensors(
    //     useSensor(PointerSensor),
    //     useSensor(TouchSensor, {
    //         activationConstraint: {
    //             delay: 250, // Long press delay for touch
    //             tolerance: 5, // Small movement before dragging
    //         },
    //     }),
    //     useSensor(KeyboardSensor, {
    //         coordinateGetter: sortableKeyboardCoordinates,
    //     })
    // );

    return (
        <div>
            <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
                <div className="bg-[#172842] min-h-screen py-8">
                    <div className="w-full max-w-2xl mx-auto px-4 py-3 text-white">
                        <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                        <div className="flex flex-wrap gap-y-3">
                            <DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
                                <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
                                    {tasks.map((todo) => (
                                        <div key={todo.id}>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <div tabIndex={0} className="md:w-[650px] hover:cursor-pointer">
                                                        <TodoItem todo={todo} />
                                                    </div>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                                                        <DialogDescription>
                                                            This action cannot be undone. This will permanently delete your account
                                                            and remove your data from our servers.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    ))}
                                </SortableContext>
                            </DndContext>
                            <TodoForm />
                        </div>
                    </div>
                </div>
            </TodoProvider>
        </div>
    )
}

{/* <DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
<SortableContext items={tasks} strategy={verticalListSortingStrategy}> */}
// </SortableContext>
// </DndContext>

export default Todo
