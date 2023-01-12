import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Card, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

import Subheader from "../Subheader";
import { environmental_data } from "../data/mock_data";
import BarGraph from "../components/BarGraph";
import PieGraph from "../components/PieGraph";

const EnergyConsumption = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { cpu_energy, gpu_energy, equivalent, other_experiments } =
    environmental_data;
  const total = (cpu_energy + gpu_energy).toFixed(2);

  const piegraph_data = [
    {
      name: 'CPU & DRAM Consumption (J)',
      value: cpu_energy,
      fill: "#b77032",
    },
    {
      name: 'GPU Consumption (J)',
      value: gpu_energy,
      fill: "#215d6e",
    },
  ];

  const bargraph_data = [
    ...other_experiments,
    {
      name: "current",
      value: total,
      fill: "#1555bd",
    },
  ];

  bargraph_data.sort((a, b) => a.value - b.value);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  return (
    <>
      <div className="innpv-memory innpv-subpanel">
        <Subheader icon="database">Energy and Environmental Impact</Subheader>
        <div className="innpv-subpanel-content">
          {isLoading ? (
            <Container fluid>
              <Row className="justify-content-md-center">
                <Card>
                  <Card.Body>
                    <Spinner animation="border" size="sm" /> Loading Energy and
                    Environmental data
                  </Card.Body>
                </Card>
              </Row>
            </Container>
          ) : (
            <Container fluid>
              <Row>
                <Col xxl={6}>
                  <div>
                    <h5>
                      Total Consumption:
                      <strong> {total}J</strong>
                    </h5>
                  </div>
                  <div>
                    <h4>Breakdown:</h4>

                    <PieGraph data={piegraph_data} height={225} />
                  </div>
                </Col>
                <Col xxl={6}>
                  <div>
                    <h5>Equivalent to:</h5>{" "}
                  </div>
                  <div>
                    <ListGroup variant="flush">
                      <ListGroup.Item style={{ border: "none" }}>
                        <FontAwesomeIcon icon={faCircle} />{" "}
                        <strong>{equivalent.carbon}</strong> kg of CO2 released
                      </ListGroup.Item>
                      <ListGroup.Item style={{ border: "none" }}>
                        <FontAwesomeIcon icon={faCircle} />{" "}
                        <strong>{equivalent.miles}</strong> miles driven
                      </ListGroup.Item>
                      <ListGroup.Item style={{ border: "none" }}>
                        <FontAwesomeIcon icon={faCircle} />{" "}
                        <strong>{equivalent.appliance}</strong> hours of TV
                      </ListGroup.Item>
                      <ListGroup.Item style={{ border: "none" }}>
                        <FontAwesomeIcon icon={faCircle} />{" "}
                        <strong>{equivalent.household}%</strong> of average
                        household consumption
                      </ListGroup.Item>
                    </ListGroup>
                  </div>

                  <div>
                    <h5>Relative to your other experiments</h5>
                  </div>
                  <div>
                    <BarGraph data={bargraph_data} height={500} xlabel={'Experiments'} ylabel={'Energy Consumption (J)'}/>
                  </div>
                </Col>
              </Row>
            </Container>
          )}
        </div>
      </div>
    </>
  );
};

export default EnergyConsumption;
