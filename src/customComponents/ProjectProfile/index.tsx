/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { useParams } from 'react-router-dom';
import { ProjectAl } from '../../interfaces';
import { useApp } from '../state';
import { message } from '../utilities/message';
import { filter } from './majorUtils';
import useAverage from './useAverage';
import useProject from './useProject';
import useProjectMeta from './useProjectMeta';
import useReviews from './useReviews';

const ProjectProfile: React.FC<{ data: ProjectAl; id: string }> = function (
  props
) {
  const { data, id } = props;
  const { state } = useApp();
  const { userData } = state;
  const { accountAddress: addr } = userData;
  let canReview = true;
  if (data.ownerID.eq(addr)) canReview = false;
  // race!

  const {
    data: reviews,
    isLoading: lrev,
    isFetched: frev,
  } = useReviews(data, id, addr);

  const {
    data: projectMeta,
    isLoading: lprm,
    isFetched: fproj,
  } = useProjectMeta(data, id);
  // get average ranking
  const [avRate] = useAverage(data, projectMeta, frev, fproj, reviews);
  // structure data here. Button component and the like
  return (
    <h1>
      Finally, some data fetching, loading? {lrev ? 'Yes' : 'No'}, and average?{' '}
      {avRate}{' '}
    </h1>
  );
};

const Main: React.FC = function () {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useProject(id);
  if (isLoading) return <i className="ui loader" />;
  const four = message('Error, project not found', true);
  if (data === 0) return four;
  const re = filter(data);
  if (re !== 2) {
    if (re === 0)
      return (
        <p>
          This project has been rejected from the chocolate ecosystem due to
          being {data.proposalStatus.reason.toString()}
        </p>
      );
    if (re === 1) return <p>This project is currently proposed</p>;
    return four;
  }
  return <ProjectProfile data={data} id={id} />;
};

export default Main;