import { useNavigate } from "react-router-dom";
import { PROFILE_MENU } from "../../src/config/profileMenu";

export default function NavProfile({ currentView }) {
  const navigate = useNavigate();

  const goTo = (key) => {
    navigate(`/pages/Profile?view=${key}`);
  };

  return (
    <div className="navbar-expand-lg navbar-light">
      <div id="sidebarNav" className="collapse navbar-collapse navbar-vertical">
        <div className="card shadow-none flex-grow-1 mb-5">
          <div className="card-body">

            {PROFILE_MENU.map(section => (
              <div key={section.title}>
                <span className="text-cap">{section.title}</span>

                <ul className="nav nav-sm nav-tabs nav-vertical mb-4">
                  {section.items.map(item => {
                    const isActive = currentView === item.key;

                    return (
                      <li className="nav-item" key={item.key}>
                        <button
                          className={`nav-link btn btn-link text-start ${isActive ? "active" : ""}`}
                          onClick={() => goTo(item.key)}
                        >
                          <i className={`bi ${item.icon} nav-icon me-2`} />
                          {item.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}
