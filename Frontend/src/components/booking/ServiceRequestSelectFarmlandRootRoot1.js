import React from "react";
import styled from "styled-components";
import './serviceRequestSelectFarmlandRootRootRoot.css';

export const ServiceRequestSelectFarmlandRootRoot1 = ({}) => {
  const OuterSpaceTextFunction = (e, name) => {
    alert(`${name} was clicked`);
  };
  return (
    <ServiceRequestSelectFarmlandRootRootRoot>
   
      <FlexRow>
        <SideMenu>
          <WhiteFlexColumn>
            <FlexRow1>
              <Setting
                src={`https://file.rendit.io/n/ovQzrDHvDvrBzRk5Em3V.svg`}
              />
              <Text2>Dashboard</Text2>
            </FlexRow1>
            <ListMenu>
              <IconOutlineKeysquare
                src={`https://file.rendit.io/n/pcqeRH2Bv1nHTZM5bqzg.svg`}
              />
              <Text3>Maintenance</Text3>
            </ListMenu>
            <FlexColumn1>
              <ListMenu1>
                <FlexRow2>
                  <IconOutlineKeysquare
                    src={`https://file.rendit.io/n/fW8PqhZKS5T0Tfz5zpc8.svg`}
                  />
                  <Text4>Book Drone Service</Text4>
                </FlexRow2>
                <Chevronright
                  src={`https://file.rendit.io/n/zLyuwviOYvL5edZqXEFk.svg`}
                />
              </ListMenu1>
            </FlexColumn1>
            <ListMenu2>
              <FlexRow3>
                <IconOutlineKeysquare
                  src={`https://file.rendit.io/n/k2lxcBFNX2XjbgqUCZST.svg`}
                />
                <Text5>My Bookings</Text5>
              </FlexRow3>
              <Chevronright1
                src={`https://file.rendit.io/n/9VCLoSYY243N1EYjuSnG.svg`}
              />
            </ListMenu2>
            <ListMenu3>
              <FlexRow2>
                <IconOutlineKeysquare
                  src={`https://file.rendit.io/n/CoITcLiPO8bbauKeEIHe.svg`}
                />
                <Text6>Service Reports</Text6>
              </FlexRow2>
              <Chevronright
                src={`https://file.rendit.io/n/9VCLoSYY243N1EYjuSnG.svg`}
              />
            </ListMenu3>
            <ListMenu4>
              <FlexRow5>
                <Usersquare
                  src={`https://file.rendit.io/n/raup9A10fNiD99xtSpXF.svg`}
                />
                <Text7>Profile</Text7>
              </FlexRow5>
              <Chevronright1
                src={`https://file.rendit.io/n/9VCLoSYY243N1EYjuSnG.svg`}
              />
            </ListMenu4>
          </WhiteFlexColumn>
        </SideMenu>
        <FlexColumn2>
          <Contents>
            <ProgressBar>
              <ActiveIndicator
                src={`https://file.rendit.io/n/9Jei6WLWwL3KBLK9drMT.svg`}
              />
              <ActiveLine
                src={`https://file.rendit.io/n/s4A93IgnaGerYRVMgZSC.svg`}
              />
              <ActiveIndicator
                src={`https://file.rendit.io/n/ITm0s1UK9f2BwwEJrlus.svg`}
              />
              <ActiveLine
                src={`https://file.rendit.io/n/KJZukQD1JpoIiSDGpk7L.svg`}
              />
              <ActiveIndicator
                src={`https://file.rendit.io/n/ITm0s1UK9f2BwwEJrlus.svg`}
              />
              <ActiveLine
                src={`https://file.rendit.io/n/s4A93IgnaGerYRVMgZSC.svg`}
              />
              <ActiveIndicator
                src={`https://file.rendit.io/n/ITm0s1UK9f2BwwEJrlus.svg`}
              />
              <ActiveLine
                src={`https://file.rendit.io/n/s4A93IgnaGerYRVMgZSC.svg`}
              />
              <ActiveIndicator
                src={`https://file.rendit.io/n/ITm0s1UK9f2BwwEJrlus.svg`}
              />
            </ProgressBar>
          </Contents>
          <Text8>Step 1: Farmland selectio</Text8>
          <Step>
            <Title>
              <Paragraph>
                Please select the farmland you would like your drone service on.
              </Paragraph>
            </Title>
          </Step>
          <FlexRow6>
            <CropCard>
              <StateEnabled>
                <Image1 />
                <TitleUsername>
                  <Text9>West Plot A</Text9>
                  <Text10>Crop</Text10>
                </TitleUsername>
              </StateEnabled>
              <StateSplash>
                <TitleUsername>
                  <Text9>South Plot C</Text9>
                  <Text10>Nursery</Text10>
                </TitleUsername>
              </StateSplash>
            </CropCard>
            <CropCardDark>
              <StateEnabled>
                <TitleUsername>
                  <Text9>North Plot B</Text9>
                  <Text10>Fruit</Text10>
                </TitleUsername>
              </StateEnabled>
              <StateSplash1>
                <TitleUsername>
                  <Text9>East Plot D</Text9>
                  <Text10>Livestock</Text10>
                </TitleUsername>
              </StateSplash1>
            </CropCardDark>
          </FlexRow6>
          <OuterSpaceText
            onClick={(e) => OuterSpaceTextFunction(e, "OuterSpaceText")}
          >
            Next
          </OuterSpaceText>
        </FlexColumn2>
      </FlexRow>
    </ServiceRequestSelectFarmlandRootRootRoot>
  );
};

const IconOutlineKeysquare = styled.img`
  width: 24px;
  height: 24px;
`;
const FlexRow2 = styled.div`
  gap: 14px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const Chevronright = styled.img`
  width: 16px;
  height: 16px;
`;
const Chevronright1 = styled.img`
  width: 16px;
  height: 16px;
  align-self: flex-start;
  margin: 2px 0px 0px 0px;
`;
const ActiveIndicator = styled.img`
  width: 12px;
  height: 12px;
`;
const ActiveLine = styled.img`
  width: 40px;
  height: 1px;
`;
const StateEnabled = styled.div`
  width: 311px;
  height: 175px;
  gap: 4px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 16px;
  border-radius: 15px;
  background-color: rgba(0, 0, 0, 0.2);
  box-shadow: 0px 2px 20px 0px rgba(153, 160, 178, 0.3);
`;
const TitleUsername = styled.div`
  gap: 4px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
const Text9 = styled.div`
  width: 299px;
  color: #ffffff;
  font-size: 20px;
  font-weight: 700;
  font-family: Work Sans;
  letter-spacing: -0.4px;
`;
const Text10 = styled.div`
  width: 299px;
  color: #ffffff;
  font-size: 16px;
  font-family: Poppins;
`;
const ServiceRequestSelectFarmlandRootRootRoot = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #ffffff;
  overflow: hidden;
`;
const FlexColumn = styled.div`
  width: 1440px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Text1 = styled.div`
  width: 525px;
  height: 41px;
  left: 27px;
  top: 27px;
  position: absolute;
  color: #1a3447;
  font-size: 36px;
  font-weight: 600;
  font-family: Inter;
`;
const Header = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
`;
const OuterSpaceFlexRow = styled.div`
  width: 726px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 36px 121px 28px 593px;
  background-color: #1a3447;
`;
const HomeRecipesArticle = styled.div`
  color: #ffffff;
  font-size: 20px;
  font-family: PT Sans;
  white-space: pre-wrap;
`;
const Search = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: flex-start;
  margin: 1px 0px 0px 0px;
`;
const Shape = styled.img`
  width: 16px;
  height: 17px;
`;
const FlexRow = styled.div`
  width: 1440px;
  gap: 29px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
const SideMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const WhiteFlexColumn = styled.div`
  width: 250px;
  height: 772px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  padding: 36px 28px;
  background-color: #ffffff;
  box-shadow: 0px 10px 60px 0px rgba(226, 236, 249, 0.5);
`;
const FlexRow1 = styled.div`
  gap: 8px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-self: flex-start;
  align-items: center;
  margin: 0px 0px 64px 0px;
`;
const Setting = styled.img`
  width: 37px;
  height: 37px;
`;
const Text2 = styled.div`
  font-size: 26px;
  font-weight: 600;
  font-family: Poppins;
  white-space: nowrap;
  letter-spacing: 0.26px;
`;
const ListMenu = styled.div`
  gap: 14px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-self: flex-start;
  align-items: center;
  margin: 0px 0px 32px 11px;
`;
const Text3 = styled.div`
  align-self: flex-start;
  margin: 1px 0px 0px 0px;
  color: #1a3447;
  font-size: 14px;
  font-weight: 500;
  font-family: Poppins;
  white-space: nowrap;
  letter-spacing: -0.14px;
`;
const FlexColumn1 = styled.div`
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-self: stretch;
  margin: 0px 0px 28px 0px;
  padding: 8px 8px 8px 11px;
  background-size: cover;
  background-image: url("https://file.rendit.io/n/ih5XNZbTh1b1gplKfzdc.svg");
`;
const ListMenu1 = styled.div`
  gap: 44px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const Text4 = styled.div`
  align-self: flex-end;
  margin: 0px 0px 1px 0px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  font-family: Poppins;
  white-space: nowrap;
  letter-spacing: -0.14px;
`;
const ListMenu2 = styled.div`
  gap: 90px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0px 8px 38px 0px;
`;
const FlexRow3 = styled.div`
  gap: 12px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const Text5 = styled.div`
  align-self: flex-start;
  color: #1a3447;
  font-size: 14px;
  font-weight: 500;
  font-family: Poppins;
  white-space: nowrap;
  letter-spacing: -0.14px;
`;
const ListMenu3 = styled.div`
  gap: 70px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0px 8px 42px 0px;
`;
const Text6 = styled.div`
  align-self: flex-end;
  margin: 0px 0px 1px 0px;
  color: #1a3447;
  font-size: 14px;
  font-weight: 500;
  font-family: Poppins;
  white-space: nowrap;
  letter-spacing: -0.14px;
`;
const ListMenu4 = styled.div`
  width: 229px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0px 8px 0px 0px;
`;
const FlexRow5 = styled.div`
  height: 25px;
  gap: 12px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
`;
const Usersquare = styled.img`
  width: 24px;
  height: 24px;
  align-self: flex-end;
`;
const Text7 = styled.div`
  color: #1a3447;
  font-size: 14px;
  font-weight: 500;
  font-family: Poppins;
  white-space: nowrap;
  letter-spacing: -0.14px;
`;
const FlexColumn2 = styled.div`
  width: 1007px;
  height: 766px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 32px 0px 46.1px 0px;
`;
const Contents = styled.div`
  gap: 80px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0px 0px 31px 0px;
  padding: 8px 0px 0px 0px;
`;
const ProgressBar = styled.div`
  width: 745px;
  gap: 8px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
const Text8 = styled.div`
  width: 1007px;
  height: 41px;
  align-self: stretch;
  margin: 0px 0px 17px 0px;
  color: #1a3447;
  font-size: 36px;
  font-weight: 600;
  font-family: Inter;
`;
const Step = styled.div`
  height: 49px;
  gap: 32px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0px 0px 31px 0px;
`;
const Title = styled.div`
  width: 724px;
  height: 73px;
  gap: 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;
const Paragraph = styled.div`
  width: 1227px;
  height: 49px;
  color: #1a3447;
  font-size: 20px;
  font-weight: 300;
  font-family: Inter;
`;
const FlexRow6 = styled.div`
  width: 910px;
  height: 476px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-self: stretch;
  align-items: flex-start;
  margin: 0px 0px 33px 0px;
  padding: 0px 91px 0px 6px;
`;
const CropCard = styled.div`
  height: 472px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px 19px;
  border-width: 1px;
  border-radius: 5px;
  border-style: dashed;
  border-color: #7b61ff;
  overflow: hidden;
`;
const Image1 = styled.div`
  width: 314px;
  height: 123px;
`;
const StateSplash = styled.div`
  width: 311px;
  height: 175px;
  gap: 4px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 16px;
  border-radius: 15px;
  background-color: rgba(87, 211, 140, 0);
  box-shadow: 0px 2px 20px 0px rgba(153, 160, 178, 0.3);
`;
const CropCardDark = styled.div`
  gap: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-self: flex-end;
  padding: 19px 19px 21px 19px;
  border-width: 1px;
  border-radius: 5px;
  border-style: dashed;
  border-color: #7b61ff;
  overflow: hidden;
`;
const StateSplash1 = styled.div`
  width: 311px;
  height: 173px;
  gap: 4px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 16px;
  border-radius: 15px;
  background-color: rgba(87, 211, 140, 0);
  box-shadow: 0px 2px 20px 0px rgba(153, 160, 178, 0.3);
`;
const OuterSpaceText = styled.button`
  width: 532px;
  height: 27.9px;
  gap: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0px 0px 0px 186px;
  padding: 0px;
  padding-top: 20px;
  padding-right: 10px;
  padding-bottom: 20px;
  padding-left: 10px;
  color: #ffffff;
  font-size: 18px;
  font-weight: 500;
  font-family: Inter;
  white-space: nowrap;
  border-width: 0px;
  border-radius: 5px;
  box-sizing: content-box;
  background-color: #1a3447;
  cursor: pointer;
  &: hover {
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.3);
  } ;
`;

export default ServiceRequestSelectFarmlandRootRoot1;