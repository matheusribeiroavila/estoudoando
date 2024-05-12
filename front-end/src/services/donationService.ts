import axios, {AxiosPromise} from "axios";
import {variables} from "../utils/variables.ts";



export type Donation = {
    _id: string,
    user: {
      address: {
        zipCode: string,
        city: string,
        uf: string
      },
      name: string,
      phone: string
    },
    description: string,
    imageUrl: string,
    createdAt: string
   
}


const { BASE_API } = variables;

export const findAll = (): AxiosPromise<Donation[]> =>
    axios.get(`${BASE_API}/donations`);

export const findAllMoreDonation = (id: string): AxiosPromise<Donation[]> =>
    axios.get(`${BASE_API}/donations?lastElementId=${id}`);

export const findByZipCode = (zipCode: string): AxiosPromise<Donation> =>
    axios.get(`${BASE_API}/donations/zipCode/${zipCode}`);
