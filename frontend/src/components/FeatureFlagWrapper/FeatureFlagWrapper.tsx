import { Feature } from "../../types/featureFlag";

type FeatureFlagWrapperProps = {
  featureName: Feature;
  children: React.ReactNode;
}

export default function FeatureFlagWrapper(props: FeatureFlagWrapperProps) {
  console.log(props)
  // TODO: Complete this component
  return <></>
}