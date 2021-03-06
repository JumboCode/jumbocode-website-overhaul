import React from 'react';
import PropTypes from 'prop-types';
import { Image, Text, Flex, Box } from 'rebass';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import Section from '../components/Section';
import { CardContainer, Card } from '../components/Card';
import { RepoLink, WebsiteLink } from '../components/SocialLink';
import Triangle from '../components/Triangle';
import ImageSubtitle from '../components/ImageSubtitle';
import Hide from '../components/Hide';
import LinkAnimated from '../components/LinkAnimated';

import ProjectList from '../data/projects';

const ProjectsByYear = {
  2019: ProjectList.filter(p => p.years.indexOf(2019) !== -1),
  2018: ProjectList.filter(p => p.years.indexOf(2018) !== -1),
  2017: ProjectList.filter(p => p.years.indexOf(2017) !== -1),
};

const Background = () => (
  <div>
    <Triangle
      color="backgroundDark"
      height={['25vh', '20vh']}
      width={['100vw', '100vw']}
      invertX
    />

    <Triangle
      color="primaryDark"
      height={['25vh', '40vh']}
      width={['75vw', '60vw']}
      invertX
      invertY
    />

    <Triangle
      color="backgroundDark"
      height={['25vh', '20vh']}
      width={['100vw', '100vw']}
      invertY
    />
  </div>
);

const CARD_HEIGHT = '200px';

const MEDIA_QUERY_SMALL = '@media (max-width: 400px)';

const Title = styled(Text)`
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  display: table;
  border-bottom: ${props => props.theme.colors.primary} 5px solid;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 100%;
  width: calc(100% - ${CARD_HEIGHT});

  ${MEDIA_QUERY_SMALL} {
    width: calc(100% - (${CARD_HEIGHT} / 2));
  }
`;

const ImageContainer = styled.div`
  margin: auto;
  width: ${CARD_HEIGHT};

  ${MEDIA_QUERY_SMALL} {
    width: calc(${CARD_HEIGHT} / 2);
  }
`;

const ProjectImage = styled(Image)`
  width: ${CARD_HEIGHT};
  height: ${CARD_HEIGHT};
  padding: 45px;
  margin-top: 0px;

  ${MEDIA_QUERY_SMALL} {
    height: calc(${CARD_HEIGHT} / 2);
    width: calc(${CARD_HEIGHT} / 2);
    margin-top: calc(${CARD_HEIGHT} / 4);
    padding: 10px;
  }
`;

const ProjectTag = styled.div`
  position: relative;
  height: ${CARD_HEIGHT};
  top: calc(
    -${CARD_HEIGHT} - 3.5px
  ); /*don't know why I have to add 3.5px here ... */

  ${MEDIA_QUERY_SMALL} {
    top: calc(-${CARD_HEIGHT} - 3.5px + (${CARD_HEIGHT} / 4));
  }
`;

const Project = ({
  name,
  description,
  projectUrl,
  repositoryUrl,
  type,
  years,
  logo,
}) => (
  <Card p={0}>
    <Flex style={{ height: CARD_HEIGHT }}>
      <TextContainer>
        <span>
          <Title my={2} pb={1}>
            {name}
          </Title>
        </span>
        <Text width={[1]} style={{ overflow: 'auto' }}>
          {description}
        </Text>
      </TextContainer>

      <ImageContainer>
        <ProjectImage src={logo.image.src} alt={logo.title} />
        <ProjectTag>
          <Flex
            style={{
              float: 'right',
            }}
          >
            {repositoryUrl && (
              <Box mx={1} fontSize={5}>
                <RepoLink name="Check repository" url={repositoryUrl} />
              </Box>
            )}
            {projectUrl && (
              <Box mx={1} fontSize={5}>
                <WebsiteLink name="See project" url={projectUrl} />
              </Box>
            )}
          </Flex>
          <ImageSubtitle
            bg="primaryLight"
            color="white"
            y="bottom"
            x="right"
            round
          >
            {type}
          </ImageSubtitle>
          <Hide query={MEDIA_QUERY_SMALL}>
            <ImageSubtitle bg="backgroundDark">
              {years.join(', ')}
            </ImageSubtitle>
          </Hide>
        </ProjectTag>
      </ImageContainer>
    </Flex>
  </Card>
);

Project.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  projectUrl: PropTypes.string,
  repositoryUrl: PropTypes.string,
  type: PropTypes.string.isRequired,
  years: PropTypes.arrayOf(PropTypes.number).isRequired,
  logo: PropTypes.shape({
    image: PropTypes.shape({
      src: PropTypes.string,
    }),
  }).isRequired,
};
class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shownYear: 2019,
      doneAnimating: true,
    };
  }

  render() {
    const { shownYear, doneAnimating } = this.state;
    return (
      <Section.Container id="projects" Background={Background}>
        <Flex justifyContent="center" alignItems="center" flexWrap="wrap">
          <Section.Header name="Projects" icon="💻" Box="notebook" />
        </Flex>
        <Flex
          width="350px"
          alignSelf="center"
          alignItems="center"
          justifyContent="space-around"
        >
          {[2019, 2018].map(year => {
            return (
              <Text as="h4" color="secondaryDark" mb={4}>
                <LinkAnimated
                  selected={shownYear === year}
                  onClick={() => {
                    // Don't animate if nothing to change.
                    if (year === shownYear) return;
                    this.setState(
                      {
                        shownYear: year,
                        doneAnimating: false,
                      },
                      () => {
                        setTimeout(() => {
                          this.setState({
                            doneAnimating: true,
                          });
                        }, 1000);
                      },
                    );
                  }}
                >
                  {year}
                </LinkAnimated>
              </Text>
            );
          })}
        </Flex>

        <CardContainer minWidth="350px">
          {ProjectsByYear[2019].map((p, i) => (
            <Fade
              bottom
              collapse
              opposite
              when={shownYear === 2019 && doneAnimating}
              delay={i * 150}
            >
              <Project key={p.id} {...p} />
            </Fade>
          ))}
        </CardContainer>
        <CardContainer minWidth="350px">
          {ProjectsByYear[2018].map((p, i) => (
            <Fade
              bottom
              collapse
              opposite
              when={shownYear === 2018 && doneAnimating}
              delay={i * 150}
            >
              <Project key={p.id} {...p} />
            </Fade>
          ))}
        </CardContainer>
      </Section.Container>
    );
  }
}

export default Projects;
