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
        {
            props.parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} />)
        }
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
        <strong>
        <p>Total of {props.total} exercises</p>
        </strong>
    )
}

const Course = ({course}) => {
    const total = course?.parts.reduce((previous, current) => {
        return previous + current.exercises
    }, 0);

    return (
        <>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total total={total} />
        </>
    );
}

export default Course;