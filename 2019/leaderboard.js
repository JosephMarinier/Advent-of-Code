// ==UserScript==
// @name         Advent of Code Leaderboard
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  On Advent of Code private leaderboards, adds tooltips to the stars giving more details about the time they took.
// @author       Joseph Marinier
// @match        https://adventofcode.com/*/leaderboard/private/view/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.querySelectorAll(`.privboard-star-locked`).forEach((star) => {
        star.classList.replace(`privboard-star-locked`, `privboard-star-unlocked`);
        star.innerText = `·`;
    });

    const [header, ...rows] = Array.from(document.querySelectorAll(`.privboard-row`));

    const date = (date) => [
        [date.getFullYear(), ...[date.getMonth() + 1, date.getDate()].map((number) => String(number).padStart(2, `0`))].join(`-`),
        [date.getHours(), date.getMinutes(), date.getSeconds()].map((number) => String(number).padStart(2, `0`)).join(`:`),
    ].join(` `);

    const ordinal = (number) => {
        const units = number % 10;
        const tens = (number - units) / 10;
        return `${number}${tens !== 1 && [`st`, `nd`, `rd`][units - 1] || `th`}`;
    };

    const em = document.createElement(`em`);
    const reset = () => {
        em.innerText = "";
    };
    const onFulfilled = () => {
        em.innerText = "Copied!";
        setTimeout(reset, 3000);
    };
    const onRejected = () => {
        em.innerText = "Error!";
        setTimeout(reset, 3000);
    };

    const a = document.createElement(`a`);
    a.href = `javascript:void(0)`;
    a.innerText = `[Tabular events]`;

    const p = document.createElement(`p`);
    p.append(`Copy `);
    p.appendChild(a);
    p.append(`. `);
    p.appendChild(em);

    document.querySelector(`article`).insertBefore(p, header);

    fetch(`${window.location.pathname}.json`).then((r) => r.json()).then(({event, members}) => {
        const membersList = Object.values(members);
        const events = [];
        const beginning = {};
        for (let day = 1; day <= 25; day++) {
            beginning[day] = new Date(Number(event), 11, day);
            for (let star = 1; star <= 2; star++) {
                membersList.filter(
                    ({completion_day_level: {[day]: stars}}) => stars && stars[star]
                ).sort(
                    (a, b) => a.completion_day_level[day][star].get_star_ts - b.completion_day_level[day][star].get_star_ts
                ).forEach(({completion_day_level, id}, rank) => {
                    const points = membersList.length - rank;
                    completion_day_level[day][star].rank = rank;
                    completion_day_level[day][star].points = points;
                    const {get_star_ts} = completion_day_level[day][star];
                    const bigger = events.findIndex((event) => event.get_star_ts > get_star_ts);
                    events.splice(bigger === -1 ? events.length : bigger, 0, {get_star_ts, id, points});
                });
            }
        }

        const activeMembers = membersList.filter((member) => Object.keys(member.completion_day_level).length > 0);
        const table = [[``, ...activeMembers.map(({name}) => name)].join(`\t`), ...events.map(({get_star_ts, id, points}) => [
            date(new Date(1000 * get_star_ts)),
            ...activeMembers.map((member) => id === member.id ? points : ``),
        ].join(`\t`))].join(`\n`);
        a.onclick = () => {
            navigator.clipboard.writeText(table).then(onFulfilled, onRejected);
        };

        const membersMap = Object.fromEntries(Object.values(members).map((member) => [member.name, member]));
        rows.forEach((row) => {
            const name = row.querySelector(`.privboard-name`).innerText;
            row.querySelectorAll(`[class^='privboard-star']`).forEach((star, i) => {
                const day = i + 1;
                const times = membersMap[name].completion_day_level[day];
                if (times) {
                    star.title = Object.entries(times).map(([part, {get_star_ts, ms, rank, points}]) => {
                        const date = new Date(1000 * get_star_ts);
                        let string = `${ordinal(rank + 1)} to finish part ${part} at ${date.toTimeString().substring(0, 8)}`;
                        const days = Math.floor((date - beginning[day]) / 86400000);
                        if (days === 1) {
                            string += ` the next day`;
                        } else if (days > 1) {
                            string += ` ${days} days later`;
                        }
                        string += ` for ${points} point${points === 1 ? `` : `s`}`;
                        return string;
                    }).join(`\n`);
                }
            });
        });
    });
})();
