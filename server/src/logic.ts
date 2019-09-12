import {Db, MongoClient} from 'mongodb';

export let db: Db;
let dbClient: MongoClient;

export async function connectToDb(url: string, dbName: string) {
    let promise = new Promise((resolve, reject) => {
            MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, client) {
                if (err !== null) {
                    console.log('ERROR CONNECTING TO DATABASE: ', err);
                }
                console.log('Connected successfully to server');
                db = client.db(dbName);
                resolve();
                dbClient = client;
                // client.close();
            });
        }
    );
    return promise;
}

export async function closeConnectionToDb() {
    await dbClient.close();
}

export const getAnswer = async (answerId: string): Promise<any> => {
    let answer = await db.collection('answers').findOne({id: answerId});
    return answer;
};

export const getAllQuestions = async (): Promise<any[]> => {
    let questions = await db.collection('questions').find({}, {projection: {_id: 0}});
    questions = await questions.toArray();
    return questions;
};

export const getUserAnswers = async (username: string): Promise<any[]> => {
    let {answers} = await db.collection('users').findOne({username}, {projection: {answers: 1, _id: 0}});
    return answers;
};

export const getAnswers = async (questionId: number): Promise<any[]> => {
    let {answers} = await db.collection('questions').findOne({id: questionId}, {projection: {answers: 1, _id: 0}});
    return answers;
};

export const newQuestion = async (question: any): Promise<string> => {
    let {value} = await db.collection('counters').findOne({name: 'questionId'});
    const questionId = value.toString();
    await db.collection('questions').insertOne({...question, id: questionId, answers: []});
    await db.collection('users').updateOne({username: question.username}, {$push: {'questions': questionId}});
    await db.collection('counters').updateOne({name: 'questionId'}, {$set: {'value': value + 1}});
    return questionId;
};

export const getQuestion = async (questionId: string): Promise<any> => {
    let question = await db.collection('questions').findOne({id: questionId});
    return question;
};

export const getUserQuestions = async (username: string): Promise<any[]> => {
    let {questions} = await db.collection('users').findOne({username}, {projection: {questions: 1, _id: 0}});
    return questions;
};

export const newAnswer = async (questionId: string, answer: any): Promise<string> => {
    let {value} = await db.collection('counters').findOne({name: 'answerId'});
    const answerId = value.toString();
    await db.collection('answers').insertOne({...answer, id: answerId, questionId});
    await db.collection('questions').updateOne({id: questionId}, {$push: {'answers': answerId}});
    await db.collection('users').updateOne({username: answer.username}, {$push: {'answers': answerId}});
    await db.collection('counters').updateOne({name: 'answerId'}, {$set: {'value': value + 1}});
    return answerId;
};

export const createUser = async (user: any): Promise<void> => {
    await db.collection('users').insertOne({...user, questions: [], answers: []});
};

export const match = async (username: string, password: string): Promise<any> => {
    let result = await db.collection('users').findOne({username, password});
    return result;
};

