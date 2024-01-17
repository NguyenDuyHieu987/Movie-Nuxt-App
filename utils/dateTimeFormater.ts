function format(date: string, formats?: string) {
  const dateObj = new Date(date);
  const options1: any = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  };
  const options2: any = {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  };

  let newDate: string = '';

  switch (formats) {
    case 'L':
      newDate = dateObj.toLocaleDateString('vi-VN', options1);
      break;
    case 'LL':
      newDate = dateObj
        .toLocaleDateString('vi-VN', options2)
        .replace(',', ' năm');
      break;
    case 'LLL':
      newDate =
        dateObj.toLocaleDateString('vi-VN', options2).replace(',', ' năm') +
        ', lúc ' +
        dateObj.toLocaleTimeString('en-US').split(':')[0] +
        ':' +
        dateObj.toLocaleTimeString('en-US').split(':')[1];
      break;
    default:
      newDate = dateObj.toLocaleDateString('vi-VN', options1);
      break;
  }

  return newDate;
}

function fromNow(
  date: string,
  options?: {
    onlyDay: boolean | false;
  }
) {
  const dateObj = new Date(date);
  const now = new Date();

  const diff = now.getTime() - dateObj.getTime();
  const diffDays = diff / ONE_DAY;

  let fromNowStr: string = '';

  if (options?.onlyDay) {
    if (diffDays < 30) {
      if (diffDays < 1) {
        fromNowStr = 'Hôm nay';
      } else if (Math.round(diffDays) == 1) {
        fromNowStr = 'Hôm qua';
      } else {
        fromNowStr = Math.round(diffDays) + ' ngày trước';
      }
    } else {
      if (diffDays < 365) {
        fromNowStr = Math.round(diffDays / 30) + ' tháng trước';
      } else {
        fromNowStr = Math.round(diffDays / 365) + ' nắm trước';
      }
    }
  } else {
    if (diffDays >= 1) {
      if (diffDays < 30) {
        fromNowStr = Math.round(diffDays) + ' ngày trước';
      } else {
        if (diffDays < 365) {
          fromNowStr = Math.round(diffDays / 30) + ' tháng trước';
        } else {
          fromNowStr = Math.round(diffDays / 365) + ' nắm trước';
        }
      }
    } else {
      const diffHours = diff / ONE_HOUR;

      if (diffHours > 1) {
        fromNowStr = Math.round(diffHours) + ' giờ trước';
      } else {
        const diffMinutes = Math.round(diff / ONE_MINUTE);

        if (diffMinutes > 1) {
          fromNowStr = Math.round(diffMinutes) + ' phút trước';
        } else {
          // const diffSeconds = Math.round(diff / 1000);

          // fromNowStr = Math.round(diffSeconds) + ' giây trước';

          fromNowStr = 'Vài giây trước';
        }
      }
    }
  }

  return fromNowStr;
}

export const dateTimeFormater = () => {
  return { format, fromNow };
};
