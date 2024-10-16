import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Form, Button, ListGroup } from 'react-bootstrap';
import axiosConfig from '../axios/axiosConfig';


const Task = () => {
const [tasks, setTasks] = useState([]); 
const [error, setError] = useState(null);
const [newTask, setNewTask] = useState({ title: '', description: '', status: 'To Do' });
const [editTask, setEditTask] = useState(null); 
  useEffect(() => {
    async function getAllTasks() {
      try {
        const res = await axiosConfig.get('/get-tasks');
        if (res?.data?.data) {
          console.log(res.data.data);
          setTasks(res.data.data);
        } else {
          alert('No tasks found');
        }
      } catch (err) {
        setError(err.message);
      }
    }
    getAllTasks();
  }, [newTask]);
  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      if (editTask) {
        await axiosConfig.put(`/update-tasks/${editTask._id}`, newTask);
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === editTask._id ? { ...task, ...newTask } : task
          )
        );
        setEditTask(null);
      } else {
        const res = await axiosConfig.post('/create-tasks', newTask);
        
     
        console.log('Server response:', res);
  
    
        if (res.data) {
          setTasks((prevTasks) => [...prevTasks, res.data]);
        
        } else {
          throw new Error('Failed to add task. Invalid response from server.');
        }
      }
      setNewTask({ title: '', description: '', status: 'To Do' });
    } catch (err) {
      setError(err.message);
    }
  };
  const handleDeleteTask = async (taskId) => {
    try {
      await axiosConfig.delete(`/delete-tasks/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId)); 
    } catch (err) {
      setError(err.message);
    }
  }
  const handleEdit = (task) => {
    setEditTask(task);
    setNewTask({ title: task.title, description: task.description, status: task.status });
  };
  return (
    <Container className="mt-5">
      {error && <div className="alert alert-danger">{error}</div>}

      <Row>
        <Col md={8}>
          <Card>
            <Card.Header as="h5">Task List</Card.Header>
            <ListGroup variant="flush">
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <ListGroup.Item key={task._id} className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6>{task.title}</h6>
                      <p className="mb-0">{task.description}</p>
                    </div>
                    <div>
                      <Button variant="primary" size="sm" onClick={() => handleEdit(task)}>
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        className="ms-2"
                        onClick={() => handleDeleteTask(task._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))
              ) : (
                <h5 className="text-center mt-3">No tasks available</h5>
              )}
            </ListGroup>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mt-4">
            <Card.Header as="h5">{editTask ? 'Edit Task' : 'Add New Task'}</Card.Header>
            <Card.Body>
              <Form onSubmit={handleAddTask}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  {editTask ? 'Save Changes' : 'Add Task'}
                </Button>
                {editTask && (
                  <Button
                    variant="secondary"
                    className="ms-2"
                    onClick={() => {
                      setEditTask(null); // Cancel edit
                      setNewTask({ title: '', description: '', status: 'To Do' });
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Task;
