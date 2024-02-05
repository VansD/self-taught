import { faPlusSquare, faMinusSquare } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react";
import { Card, CardHeader, CardBody } from "react-bootstrap"
import { IAnswer } from "../../../../store/models/ITask";
import { AddAnswerForm } from "./AddAnswerForm";
import { AnswerList } from "./AnswerList";

type AnswerProps = {
    answers: IAnswer[] | undefined
}

export const Answers = ({ answers }: AnswerProps) => {
    const [showAddAnswer, setShowAddAnswer] = useState(false);
    const [answersLocal, setAnswersLocal] = useState(answers);
    const closeAddForm = () => setShowAddAnswer(!showAddAnswer);

    return <Card>
        <CardHeader className="d-flex justify-content-between">
            <h4>Ответы</h4>
            <FontAwesomeIcon onClick={closeAddForm} icon={!showAddAnswer ? faPlusSquare : faMinusSquare} size="2x" />
        </CardHeader>
        <CardBody>
            {showAddAnswer
                ? <AddAnswerForm closeCallback={closeAddForm} />
                : <AnswerList answers={answers} />
            }
        </CardBody>
    </Card>
}