const sum = require('./sum')
const event= require("./event")
// const getUserTest= require("./request")
import { IncomingMessage } from 'http';
import EventsController from "../Core/controllers/EventsController";
import Request from "../Core/services/Request";
const app = require('../Core/services/Server')
//const request=require("./request")
import { getUserTest } from './request';
import { logUser } from './request';


import request from "supertest";

const baseUrl = 'http://127.0.0.1:3500';

describe('Get user', () => {
	it('retourne KO si pas connecté', async () => {
		const response = await request(baseUrl)
			.post('/api/users');
let res=JSON.parse(response.text)
		expect(res.msg).toBe("ko");
	});

})

describe('Ajout event user non connecté', () => {
	it('should return a 403 status code', async () => {
		const response = await request(baseUrl)
			.post('/api/events').send(	{	"nom": "test4",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis hendrerit nulla eget tortor bibendum, ac suscipit eros consequat.",
      "id_lieu": 1,
      "id_categorie": 1,
      "dateDebut": "2022-10-05T08:00:00.000Z",
      "dateFin": "2022-10-15T17:00:00.000Z",
      "dateLimit": "2022-09-20T15:00:00.000Z",
      "isPublic": true,
      "nbPlace": 200,
      "prix": 15,
      "partenaires":[]});
  
let res=JSON.parse(response.text)
		expect(res.status).toBe("403");
	});

})