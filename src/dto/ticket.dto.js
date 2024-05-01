import { nanoid } from 'nanoid';

export default class TicketDTO {
    constructor(ticket){
        this.code = nanoid(), 
        this.purchaser = ticket.user.email,
        this.purchase_datetime = Date.now, 
        this.amount = ticket.amount
    }
}