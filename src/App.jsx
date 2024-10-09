import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [developers, setDevelopers] = useState([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [genderFilter, setGenderFilter] = useState("");
  const [majorFilter, setMajorFilter] = useState("");
  const [allDevelopers, setAllDevelopers] = useState([]);
  const limit = 10;

  useEffect(() => {
    loadMoreDevelopers();
  }, []);

  const loadMoreDevelopers = () => {
    if (!hasMore) return;
    setLoading(true);
    axios
      .get(
        `https://json-api.uz/api/project/11-dars/developers?skip=${skip}&limit=${limit}`
      )
      .then((response) => {
        const newDevelopers = response.data.data;
        if (newDevelopers.length < limit) {
          setHasMore(false);
        }
        setDevelopers((prev) => [...prev, ...newDevelopers]);
        setAllDevelopers((prev) => [...prev, ...newDevelopers]);
        setSkip((prevSkip) => prevSkip + limit);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const filteredDevelopers = allDevelopers.filter((developerr) => {
    return (
      (genderFilter === "" || developerr.gender === genderFilter) &&
      (majorFilter === "" || developerr.major === majorFilter)
    );
  });

  return (
    <div className="max-w-7xl mx-auto mt-10 mb-10">
      <h1 className="text-center text-4xl font-bold text-blue-600 mb-6">
        Developer List
      </h1>
      <div className="flex justify-center mb-6">
        <select
          className="border rounded-md p-2 mx-2"
          value={genderFilter}
          onChange={(event) => setGenderFilter(event.target.value)}
        >
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <select
          className="border rounded-md p-2 mx-2"
          value={majorFilter}
          onChange={(event) => setMajorFilter(event.target.value)}
        >
          <option value="">All Majors</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Engineering">Engineering</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredDevelopers.map((developerr, index) => (
          <div
            key={index}
            className="border rounded-lg shadow-lg p-6 bg-white transform transition duration-500 hover:scale-105"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {developerr.fullName}
            </h2>
            <p className="text-gray-600">
              <strong>Age: </strong> {developerr.age}
            </p>
            <p className="text-gray-600">
              <strong>Job: </strong> {developerr.major}
            </p>
            <p className="text-gray-600">
              <strong>Gender: </strong> {developerr.gender}
            </p>
          </div>
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMoreDevelopers}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
          >
            {loading ? "Loading..." : "Show More"}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;