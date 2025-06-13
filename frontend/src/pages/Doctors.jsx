import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();

  const { doctors } = useContext(AppContext);

  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [listLoading, setListLoading] = useState(true);

  // Filter logic with frame delay
  const applyFilter = () => {
    setListLoading(true);
    const filtered = speciality
      ? doctors.filter(
          (d) => d.speciality.toLowerCase() === speciality.toLowerCase()
        )
      : doctors;

    requestAnimationFrame(() => {
      setFilterDoc(filtered);
      setListLoading(false);
    });
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div>
      <p className="text-gray-600">Browse through the doctors specialisation.</p>

      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        {/* Filters toggle (mobile) */}
        <button
          onClick={() => setShowFilter((prev) => !prev)}
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
            showFilter ? 'bg-primary text-white' : ''
          }`}
        >
          Filters
        </button>

        {/* Filters column */}
        <div
          className={`flex-col gap-4 text-sm text-gray-600 ${
            showFilter ? 'flex' : 'hidden sm:block gap-1'
          }`}
        >
          {[
            'General physician',
            'Gynecologist',
            'Dermatologist',
            'Pediatrician',
            'Neurologist',
            'Gastroentrologist',
          ].map((label) => (
            <p
              key={label}
              onClick={() =>
                speciality === label
                  ? navigate('/doctors')
                  : navigate(`/doctors/${label}`)
              }
              className={`w-[98vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded cursor-pointer transition-all whitespace-nowrap ${
                speciality === label ? 'bg-indigo-100 text-black' : ''
              }`}
            >
              {label}
            </p>
          ))}
        </div>

        {/* Doctors grid with min height to avoid jitter */}
        <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4 gap-y-6 min-h-[400px]">
          {!listLoading &&
            filterDoc.map((doc) => (
              <div
                key={doc._id}
                onClick={() => navigate(`/appointment/${doc._id}`)}
                className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
              >
                <img className="bg-blue-50" src={doc.image} alt="" />
                <div className="p-4">
                  <div
                    className={`flex items-center gap-2 text-sm ${
                      doc.available ? 'text-green-500' : 'text-gray-500'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        doc.available ? 'bg-green-500' : 'bg-gray-500'
                      }`}
                    />
                    <p>{doc.available ? 'Available' : 'Not Available'}</p>
                  </div>
                  <p className="text-gray-900 text-lg font-medium">{doc.name}</p>
                  <p className="text-gray-600 text-sm">{doc.speciality}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
