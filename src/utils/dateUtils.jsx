// src/utils/dateUtils.js
import {
	parseISO,
	isSameDay,
	subDays,
	differenceInCalendarDays,
	getWeek,
	getYear,
	startOfDay,
	eachDayOfInterval,
	format,
	isWithinInterval,
} from "date-fns";

export const parseEntryDate = (dateString) => startOfDay(parseISO(dateString));

export const getToday = () => startOfDay(new Date());

export {
	isSameDay,
	subDays,
	differenceInCalendarDays,
	getWeek,
	getYear,
	startOfDay,
	eachDayOfInterval,
	format,
	parseISO,
	isWithinInterval,
};
