import React from "react";
import { IAnswer } from "../../../../store/models/ITask";

type Answer = {
    id: number;
    text?: string | number;
    imgUrl?: string;
    isRight: boolean;
}

type AnswerListProps = {
    answers: IAnswer[] | undefined;
}

export const AnswerList = ({ answers }: AnswerListProps) => {
    return <React.Fragment>
        {answers && answers.length > 0
            ? answers?.map(answer => <div key={answer.id}>{answer.text}</div>)
            : <div>Нет ответов</div>}
    </React.Fragment>;
}