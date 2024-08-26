export const parse_date = (date: string) => {
    let date_session : any = new Date(date)
    date_session = new Date(date_session.getTime() + (date_session.getTimezoneOffset() * 60000))
    
    date_session = date_session.toLocaleString("es-CO", {year: 'numeric', month: '2-digit', day: '2-digit', weekday:"long", hour: '2-digit', hour12: true, minute:'2-digit', second:'2-digit'})

    return date_session
}