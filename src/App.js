import { useState } from 'react';
import './App.css';

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      <Part part={props.parts[0].name} exercises={props.parts[0].exercises} />
      <Part part={props.parts[1].name} exercises={props.parts[1].exercises} />
      <Part part={props.parts[2].name} exercises={props.parts[2].exercises} />
    </>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises  + props.parts[2].exercises }</p>
    </>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const StatisticLine  = (props) => {
  return (
    <>
      <tr>
        <td>{props.text}</td>
        <td>{props.text !== "positive" ? props.value : props.value + '%'}</td>
      </tr>
    </>
  )
}

const Statistics = (props) => {
  return (
    <>
      <h2>statistics</h2>
      {
        props.all == 0 && <p>No feedback given.</p>
      }
      {
        props.all > 0 && 
        <table>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="all" value={props.all} />
          <StatisticLine text="average" value={props.average} />
          <StatisticLine text="positive" value={props.positive} />
        </table>
      }
    </>
  )
}

const Anecdotes = (props) => {
  return (
    <div className="anecdotes">
      <h2>Anecdote of the day</h2>
      <div>
        {props.anecdotes[props.selected]}
      </div>
      <span>has {props.votes[props.selected]} votes.</span>
      <Button text="vote" handleClick={props.handleVote} />
      <Button text="next anecdote" handleClick={props.handleNext} />
      <h2>Anecdote with most votes</h2>
      {
        props.mostVoted !== null &&
        <div>
          <div>{props.anecdotes[props.mostVoted]}</div>
          <span>has {props.votes[props.mostVoted]} votes.</span>
        </div>
      }
    </div>
  )
}

// Exercise 1.12-1-1.14
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [selected, setSelected] = useState(0);
  const [mostVoted, setMostVoted] = useState(null);

  const next = () => {
    let rand = getRandom();
    setSelected(rand);
  }
  const onVote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
    
    let index = mostVoted;
    let count = 0;
    for (let i = 0; i < copy.length; i++) {
      if (copy[i] > count) {
        count = copy[i];
        index = i;
      }
    }
    setMostVoted(index);
  }

  const getRandom = () => {
    return Math.floor(Math.random() * anecdotes.length);
  };

  return (
    <>
      <Anecdotes anecdotes={anecdotes} votes={votes} selected={selected} mostVoted={mostVoted} handleVote={onVote} handleNext={next}/>
    </>
  );
}

// // Exercise 1.6-1-1.11
// const App = () => {
//   // save clicks of each button to its own state
//   const [good, setGood] = useState(0)
//   const [neutral, setNeutral] = useState(0)
//   const [bad, setBad] = useState(0)
//   const [all, setAll] = useState(0)
//   const [average, setAverage] = useState(0)
//   const [positive, setPositive] = useState(0)

//   const handleGoodClick = () => {
//     setGood(good + 1);
//     let newGood = good + 1;
//     let total = getTotal(newGood, neutral, bad);
//     let ave = getAverage(newGood, neutral, bad, total);
//     setAll(total);
//     setAverage(ave);
//     setPositive(newGood/total * 100);
//   };

//   const handleNeutralClick = () => {
//     setNeutral(neutral + 1);
//     let newNeutral = neutral + 1;
//     let total = getTotal(good, newNeutral, bad);
//     let ave = getAverage(good, newNeutral, bad, total);
//     setAll(total);
//     setAverage(ave);
//     setPositive(good/total * 100);
//   };

//   const handleBadClick = () => {
//     setBad(bad + 1);
//     let newBad = bad + 1;
//     let total = getTotal(good, neutral, newBad);
//     let ave = getAverage(good, neutral, newBad, total);
//     setAll(total);
//     setAverage(ave);
//     setPositive(good/total * 100);
//   };

//   const getTotal = (good, neutral, bad) => {
//     return good + neutral + bad;
//   }
  
//   const getAverage = (good, neutral, bad, total) => {
//     return ((good + (neutral * 0) + (bad * -1)) / total);
//   }

//   return (
//     <div>
//       <h2>give feedback</h2>
//       <Button handleClick={handleGoodClick} text="good"/>
//       <Button handleClick={handleNeutralClick} text="neutral"/>
//       <Button handleClick={handleBadClick} text="bad"/>
//       <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
//     </div>
//   );
// }

// // Exercise 1.1-1-5
// const App = () => {
//   const course = {
//     name: 'Half Stack application development',
//     parts: [
//       {
//         name: 'Fundamentals of React',
//         exercises: 10
//       },
//       {
//         name: 'Using props to pass data',
//         exercises: 7
//       },
//       {
//         name: 'State of a component',
//         exercises: 14
//       }
//     ]
//   };

//   return (
//     <div>
//       <Header course={course.name} />
//       <Content parts={course.parts} />
//       <Total parts={course.parts} />
//     </div>
//   )
// }

export default App;