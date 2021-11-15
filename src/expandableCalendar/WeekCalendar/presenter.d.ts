import XDate from 'xdate';
import React from 'react';
import { DateData } from '../../types';
import { WeekCalendarProps } from './index';
declare class Presenter {
    private _applyAndroidRtlFix;
    private _firstAndroidRTLScrollIgnored;
    list: React.RefObject<any>;
    scrollToIndex: (animated: boolean) => void;
    isSameWeek: (date: XDate, prevDate: XDate, firstDay: number) => boolean | undefined;
    onDayPress: (context: any, value: DateData) => void;
    onScroll: ({ context, updateState, x, page, items, width }: any) => void;
    onMomentumScrollEnd: ({ items, props, page, updateItems }: any) => void;
    shouldComponentUpdate: (context: any, prevContext: any) => boolean;
    getDate({ current, context, firstDay }: WeekCalendarProps, weekIndex: number): string;
    getDatesArray: (args: WeekCalendarProps) => string[];
    _shouldUpdateState: (page: number, newPage: number) => boolean;
    _getX: (x: number, itemsCount: number, containerWidth: number) => number;
    _getNewPage: (x: number, containerWidth: number) => number;
    _isFirstPage: (page: number) => boolean;
    _isLastPage: (page: number, items: Date[]) => boolean;
    _getNextPageItems: (items: Date[]) => Date[];
    _getFirstPageItems: (items: Date[]) => Date[];
    _mergeArraysFromEnd: (items: any[], newArray: any[]) => any[];
    _mergeArraysFromTop: (items: any[], newArray: any[]) => any[];
    _getItemsForPage: (page: number, items: Date[]) => Date[];
}
export default Presenter;
