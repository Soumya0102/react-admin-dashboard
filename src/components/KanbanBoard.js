// src/components/KanbanBoard.js
import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Take out the garbage' },
    'task-2': { id: 'task-2', content: 'Watch my favorite show' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: ['task-1', 'task-2'],
    },
  },
  columnOrder: ['column-1'],
};

const KanbanBoard = () => {
  const [state, setState] = useState(initialData);
  const [formData, setFormData] = useState({ content: '' });

  const handleChange = (e) => {
    setFormData({ content: e.target.value });
  };

  const handleAddTask = () => {
    const newTaskId = `task-${Object.keys(state.tasks).length + 1}`;
    const newTask = { id: newTaskId, content: formData.content };
    const newTasks = {
      ...state.tasks,
      [newTaskId]: newTask,
    };

    const newColumn = {
      ...state.columns['column-1'],
      taskIds: [...state.columns['column-1'].taskIds, newTaskId],
    };

    const newState = {
      ...state,
      tasks: newTasks,
      columns: {
        ...state.columns,
        'column-1': newColumn,
      },
    };

    setState(newState);
    setFormData({ content: '' });
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const column = state.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newColumn.id]: newColumn,
      },
    };

    setState(newState);
  };

  return (
    <div>
      <Box mb={2}>
        <TextField
          name="content"
          label="New Task"
          value={formData.content}
          onChange={handleChange}
          sx={{ mr: 2 }}
        />
        <Button variant="contained" onClick={handleAddTask}>
          Add Task
        </Button>
      </Box>
      <DragDropContext onDragEnd={onDragEnd}>
        {state.columnOrder.map((columnId) => {
          const column = state.columns[columnId];
          const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

          return (
            <Droppable key={column.id} droppableId={column.id}>
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    backgroundColor: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                    padding: 4,
                    width: 250,
                    minHeight: 500,
                  }}
                >
                  <h3>{column.title}</h3>
                  {tasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            userSelect: 'none',
                            padding: 16,
                            margin: '0 0 8px 0',
                            minHeight: '50px',
                            backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
                            color: 'white',
                            ...provided.draggableProps.style,
                          }}
                        >
                          {task.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          );
        })}
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
