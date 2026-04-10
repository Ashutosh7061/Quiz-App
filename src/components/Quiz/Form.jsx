import React, { useEffect, useState, useRef } from "react";
import "./Quiz.css";

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [index, setIndex] = useState(0);
    const [question, setQuestion] = useState(null);
    const [lock, setLock] = useState(false);
    const [score, setScore] = useState(0);
    const [result, setResult] = useState(false);
    const [category, setCategory] = useState(""); // selected category
    const [loading, setLoading] = useState(false);

    // refs for 4 options
    const option1 = useRef(null);
    const option2 = useRef(null);
    const option3 = useRef(null);
    const option4 = useRef(null);
    const option_array = [option1, option2, option3, option4];

    // categories for dropdown
    const categories = [
        { id: "9", name: "General Knowledge" },
        { id: "18", name: "Science: Computers" },
        { id: "21", name: "Sports" },
        { id: "23", name: "History" },
        { id: "22", name: "Geography" },
    ];

    // fetch data from API
    const fetchData = async (catId) => {
        try {
            setLoading(true);
            const res = await fetch(
                `https://the-trivia-api.com/v2/questions?limit=15&categories=${catId}`
            );
            const data = await res.json();

            const formatted = data.map((q) => {
                const allOptions = [...q.incorrectAnswers, q.correctAnswer];
                const shuffled = allOptions.sort(() => Math.random() - 0.5);
                return {
                    question: q.question.text,
                    options: shuffled,
                    ans: shuffled.indexOf(q.correctAnswer) + 1,
                };
            });

            setQuestions(formatted);
            setQuestion(formatted[0]);
            setIndex(0);
            setScore(0);
            setResult(false);
        } catch (err) {
            console.error("Failed to fetch API:", err);
        } finally {
            setLoading(false);
        }
    };

    // handle category selection
    const handleStartQuiz = () => {
        if (category) {
            fetchData(category);
        }
    };

    // check answer
    const checkAns = (e, ans) => {
        if (!lock) {
            if (question.ans === ans) {
                e.target.classList.add("correct");
                setScore((prev) => prev + 1);
            } else {
                e.target.classList.add("wrong");
                option_array[question.ans - 1].current.classList.add("correct");
            }
            setLock(true);
        }
    };

    // next question
    const next = () => {
        if (lock) {
            if (index === questions.length - 1) {
                setResult(true);
                return;
            }
            const newIndex = index + 1;
            setIndex(newIndex);
            setQuestion(questions[newIndex]);
            setLock(false);

            option_array.forEach((option) => {
                option.current.classList.remove("wrong");
                option.current.classList.remove("correct");
            });
        }
    };

    // reset quiz
    const reset = () => {
        setQuestions([]);
        setQuestion(null);
        setCategory("");
        setIndex(0);
        setScore(0);
        setResult(false);
        setLock(false);
        option_array.forEach((option) => {
            option.current.classList.remove("wrong");
            option.current.classList.remove("correct");
        });
    };

    return (
        <div className="container">
            <h1>Quiz App</h1>
            <hr />

            {/* Category selection before quiz */}
            {questions.length === 0 && !loading && (
                <div className="category-select">
                    <h2>Select Category</h2>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">-- Choose a category --</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    <button onClick={handleStartQuiz} disabled={!category}>
                        Start Quiz
                    </button>
                </div>
            )}

            {loading && <h2>Loading questions...</h2>}

            {/* Quiz section */}
            {question && !result && !loading && (
                <>
                    <h2>
                        {index + 1}. {question.question}
                    </h2>
                    <ul>
                        <li ref={option1} onClick={(e) => checkAns(e, 1)}>
                            {question.options[0]}
                        </li>
                        <li ref={option2} onClick={(e) => checkAns(e, 2)}>
                            {question.options[1]}
                        </li>
                        <li ref={option3} onClick={(e) => checkAns(e, 3)}>
                            {question.options[2]}
                        </li>
                        <li ref={option4} onClick={(e) => checkAns(e, 4)}>
                            {question.options[3]}
                        </li>
                    </ul>
                    <button onClick={next}>Next</button>
                    <div className="index">
                        {index + 1} of {questions.length} questions
                    </div>
                </>
            )}

            {/* Result section */}
            {result && (
                <>
                    <h2>
                        You scored {score} out of {questions.length}
                    </h2>
                    <button onClick={reset}>Reset</button>
                </>
            )}
        </div>
    );
};

export default Quiz;
