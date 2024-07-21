import React, { useState, useEffect } from "react";
import "./index.css";
// const classNames = require('classnames');
import classNames from 'classnames';


export default function FootballMatchesData() {
  const [selectedYear, setSelectedYear] = useState(null);
  const [matches, setMatches] = useState([]);
  const [noResult, setNoResult] = useState(false);

  useEffect(() => {
    if (selectedYear) {
      fetch(`https://jsonmock.hackerrank.com/api/football_competitions?year=${selectedYear}`)
        .then(response => response.json())
        .then(data => {
          if (data.data.length > 0) {
            setMatches(data.data);
            setNoResult(false);
          } else {
            setMatches([]);
            setNoResult(true);
          }
        });
    }
  }, [selectedYear]);

  const years = [2011, 2012, 2013, 2014, 2015, 2016, 2017];

  return (
    <div className="layout-row">
      <div className="section-title">Select Year</div>
      <ul className="sidebar" data-testid="year-list">
        {years.map(year => (
          <li
            className={classNames({
              'sidebar-item': true,
              'active': selectedYear === year
            })}
            onClick={() => setSelectedYear(year)}
            key={year}
          >
            <a>{year}</a>
          </li>
        ))}
      </ul>

      <section className="content">
        {matches.length > 0 && (
          <div className="total-matches" data-testid="total-matches">
            Total matches: {matches.length}
          </div>
        )}

        {matches.length > 0 && (
          <ul className="mr-20 matches styled" data-testid="match-list">
            {matches.map(match => (
              <li className="slide-up-fade-in" key={match.name}>
                Match {match.name} won by {match.winner}
              </li>
            ))}
          </ul>
        )}

        {noResult && (
          <div data-testid="no-result" className="slide-up-fade-in no-result">
            No Matches Found
          </div>
        )}
      </section>
    </div>
  );
}
