import React from "react";
import './SortingVisualizer.css';
import { useState, useEffect, useRef } from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import { Tree } from 'react-d3-tree';

function SortingVisualizer() {
  const [array, setArray] = useState([]);
  const [algorithm, setAlgorithm] = useState('bubble');
  const [speed, setSpeed] = useState(50);
  const [selectedColumnIndex, setSelectedColumnIndex] = useState(null);


  useEffect(() => {
    generateArray(10);
  }, []);

  const generateArray = (length) => {
    const newArray = Array.from({ length }, () => Math.floor(Math.random() * 100) + 1);
    setArray(newArray);
  };

  const sortArray = async () => {
    setSelectedColumnIndex(null);

    switch (algorithm) {
      case 'bubble':
        await bubbleSort([...array]);
        break;
      case 'quick':
        await quickSort([...array], 0, array.length - 1);
        break;
      case 'heap':
        await heapSort([...array]);
        break;
      case 'merge':
        await mergeSort([...array]);
        break;
      default:
        break;
    }
  };

  const bubbleSort = async (arr) => {
    const len = arr.length;
    let swapped;
    do {
      swapped = false;
      for (let i = 0; i < len; i++) {
        setSelectedColumnIndex(i);
        if (arr[i] > arr[i + 1]) {
          [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
          setArray([...arr]);
          await sleep(1000 / speed);
          swapped = true;
        }
      }
    } while (swapped);

    setSelectedColumnIndex(null);
  };

  const quickSort = async (arr, low, high) => {
    if (low < high) {
      const pivotIndex = await partition(arr, low, high);
      await quickSort(arr, low, pivotIndex - 1);
      await quickSort(arr, pivotIndex + 1, high);
    }
  };
  
  const partition = async (arr, low, high) => {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j <= high - 1; j++) {
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        setSelectedColumnIndex(j);
        await sleep(1000 / speed);
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    await sleep(1000 / speed);
    setSelectedColumnIndex(null);
    return i + 1;
  };

  const heapSort = async (arr) => {
    const heapify = async (arr, n, i) => {
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;
  
      if (left < n && arr[left] > arr[largest]) {
        largest = left;
      }
  
      if (right < n && arr[right] > arr[largest]) {
        largest = right;
      }
  
      if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        setArray([...arr]);
        setSelectedColumnIndex(i);
        await sleep(1000 / speed);
        await heapify(arr, n, largest);
      }
    };
  
    const n = arr.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(arr, n, i);
    }
  
    for (let i = n - 1; i > 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]];
      setArray([...arr]);
      setSelectedColumnIndex(i);
      await sleep(1000 / speed);
      await heapify(arr, i, 0);
    }
  };

  const mergeSort = async (arr) => {
    const merge = async (left, right) => {
      const result = [];
      let leftIndex = 0;
      let rightIndex = 0;
  
      while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
          result.push(left[leftIndex]);
          setArray([...arr.slice(0, leftIndex), left[leftIndex], ...arr.slice(leftIndex + 1)]);
          setSelectedColumnIndex(leftIndex);
          await sleep(1000 / speed);
          leftIndex++;
        } else {
          result.push(right[rightIndex]);
          setArray([...arr.slice(0, rightIndex + left.length), right[rightIndex], ...arr.slice(rightIndex + left.length + 1)]);
          setSelectedColumnIndex(rightIndex + left.length);
          await sleep(1000 / speed);
          rightIndex++;
        }
      }
  
      result.push(...left.slice(leftIndex));
      result.push(...right.slice(rightIndex));
  
      setArray([...result]);
      await sleep(1000 / speed);
  
      return result;
    };
  
    const mergeSortHelper = async (arr) => {
      if (arr.length <= 1) {
        return arr;
      }
  
      const middle = Math.floor(arr.length / 2);
      const left = arr.slice(0, middle);
      const right = arr.slice(middle);
  
      return merge(await mergeSortHelper(left), await mergeSortHelper(right));
    };
  
    const sortedArray = await mergeSortHelper(arr);
    setArray([...sortedArray]);
    setSelectedColumnIndex(null);
  };

  const handleAlgorithmChange = (event) => {
    setAlgorithm(event.target.value);
  };

  const handleSpeedChange = (event) => {
    setSpeed(event.target.value);
  };

  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  };

  const generateRandomArray = () => {
    const newArray = Array.from({ length: array.length }, () => Math.floor(Math.random() * 100) + 1);
    setArray(newArray);
  };


  return (
<Container>
  <Row>
    <Col>
      <h1 style={{ textAlign: 'center' }}>Algorithms Visualizer</h1>
      <div className="form-container">
      <Form style={{ maxWidth: '400px', margin: '40px auto' }}>
        <Form.Group controlId="arrayLength">
          <Form.Label>Array Length</Form.Label>
          <Form.Control type="number" defaultValue={array.length} onChange={(e) => generateArray(parseInt(e.target.value))} />
        </Form.Group>
        <Form.Group controlId="algorithm">
          <Form.Label>Sorting Algorithm</Form.Label>
          <Form.Control as="select" onChange={handleAlgorithmChange}>
            <option value="bubble">Bubble Sort</option>
            <option value="quick">Quick Sort</option>
            <option value="heap">Heap Sort</option>
            <option value="merge">Merge Sort</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="speed">
          <Form.Label>Speed</Form.Label>
          <Form.Control type="range" min="1" max="100" defaultValue={speed} onChange={handleSpeedChange} />
        </Form.Group>
        <Button variant="primary" onClick={generateRandomArray}>Randomizza Array</Button>
        <Button variant="primary" onClick={sortArray}>Sort</Button>
      </Form>
      </div>
      <div className="array-container">
        {array.map((value, index) => (
          <div
            className={`array-bar ${selectedColumnIndex === index? 'highlighted' : ''} ${index === array.length - 1? 'orted' : ''}`}
            key={index}
            style={{ height: `${value * 3}px` }} /* keep the dynamic height calculation */
          >
            {value}
          </div>
        ))}
      </div>
    </Col>
  </Row>
</Container>
  );
}

export default SortingVisualizer;