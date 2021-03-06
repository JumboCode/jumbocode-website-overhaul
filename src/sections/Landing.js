import React, { Fragment } from 'react';
import { Heading, Flex, Text } from 'rebass';
import TextLoop from 'react-text-loop';
import { SectionLink } from 'react-scroll-section';
import Fade from 'react-reveal/Fade';
import Section from '../components/Section';
import BouncyArrow from '../components/BouncyArrow';
import Triangle from '../components/Triangle';

const Background = () => (
  <div>
    <Triangle
      color="backgroundDark"
      height={['25vh', '80vh']}
      width={['95vw', '60vw']}
    />

    <Triangle
      color="secondary"
      height={['30vh', '80vh']}
      width={['50vw', '30vw']}
    />

    <Triangle
      color="primaryDark"
      height={['35vh', '35vh']}
      width={['90vw', '60vw']}
      invertX
    />

    <Triangle
      color="backgroundDark"
      height={['20vh', '20vh']}
      width={['100vw', '100vw']}
      invertX
      invertY
    />
  </div>
);

// See: https://github.com/EmaSuriano/gatsby-starter-mate/commit/547849248ff4f9a93be575b31bb3c35c47043ba0
// https://github.com/EmaSuriano/gatsby-starter-mate/issues/54
const centerHorizontally = { marginRight: 'auto', marginLeft: 'auto' };

const LandingPage = () => {
  const roles = [
    'Empowering Students',
    'Supporting Non-Profits',
    'Volunteering Locally',
    'Impacting Globaly',
    'Building Custom Technology',
  ];
  return (
    <Section.Container id="home" Background={Background}>
      <Fragment>
        <Heading
          as="h1"
          fontSize={['10vw']}
          mb={[3, 4, 5]}
          alignSelf="center"
          style={centerHorizontally}
        >
          <Flex>
            <Fade>
              <Text color="secondary">Jumbo</Text>
            </Fade>
            <Fade delay={500}>
              <Text color="primary">Code</Text>
            </Fade>
          </Flex>
        </Heading>

        <Heading
          as="h2"
          color="primary"
          fontSize={[4, 5, 6]}
          mb={[3, 5]}
          textAlign="center"
          style={centerHorizontally}
        >
          <Fade delay={1000}>
            <TextLoop mask noWrap={false}>
              {roles.map(text => (
                <Text width={[300, 800]} key={text}>
                  {text}
                </Text>
              ))}
            </TextLoop>
          </Fade>
        </Heading>
        <SectionLink section="about">
          {({ onClick }) => <BouncyArrow onClick={onClick} />}
        </SectionLink>
      </Fragment>
    </Section.Container>
  );
};

export default LandingPage;
