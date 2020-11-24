export function convertDateTimeToString(datetime) {
    const parts = datetime.split('T');
    const date = parts[0];
    const time = parts[1];
    const date_parts = date.split('-');
    const time_parts = time.split(':');
    const re_date = date_parts[1] + '/' + date_parts[2] + '/' + date_parts[0];
    let re_time;
    if (parseInt(time_parts[0])-12 > 0) {
        re_time = parseInt(time_parts[0])-12 + ':' + time_parts[0] + ' PM';
    } else {
        re_time = time_parts[0] + ':' + time_parts[0] + 'AM';
    }
    return re_date + ' at ' + re_time;


}
