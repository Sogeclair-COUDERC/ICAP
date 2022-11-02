import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileImport,
  faPeopleRoof,
  faPenToSquare,
  faIndustry,
  faScissors,
  faHandHoldingHand,
  faSackDollar,
  faShoePrints,
} from "@fortawesome/free-solid-svg-icons";
import "./style.css";

const MenuDirection = () => {
  return (
    <div className="navbar" id="container-directionPage-menu">
      <div id="container-directionPage-list">
        <ul id="directionPage-list-1st-level">
          <li>
            <p>
              <FontAwesomeIcon icon={faFileImport} />
              &nbsp;&nbsp;&nbsp;
              <span>Données d'entrée</span>
            </p>
            <ul id="directionPage-list-2nd-level">
              <li>
                <p>
                  <FontAwesomeIcon icon={faPeopleRoof} />
                  &nbsp;&nbsp;&nbsp;
                  <span id="directionPage-list-item-direction">Direction</span>
                </p>
              </li>
              <li>
                <p>
                  <FontAwesomeIcon icon={faPenToSquare} />
                  &nbsp;&nbsp;&nbsp;
                  <span>Bureau d'étude</span>
                </p>
              </li>
              <li>
                <p>
                  <FontAwesomeIcon icon={faIndustry} />
                  &nbsp;&nbsp;&nbsp;
                  <span>Manufacturing</span>
                </p>
                <ul id="directionPage-list-3rd-level">
                  <li>
                    <p>
                      <FontAwesomeIcon icon={faScissors} />
                      &nbsp;&nbsp;&nbsp;
                      <span>Découpe Lectra</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <FontAwesomeIcon icon={faHandHoldingHand} />
                      &nbsp;&nbsp;&nbsp;
                      <span>Moulage</span>
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <p>
              <FontAwesomeIcon icon={faSackDollar} />{" "}
              <span>Investissements</span>
            </p>
          </li>
          <li>
            <p>
              <FontAwesomeIcon icon={faShoePrints} />{" "}
              <span>Empreinte au sol</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MenuDirection;
