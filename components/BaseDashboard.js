import Head from "next/head";
import { Skeleton } from "@material-ui/lab";
import IMAGES from "@constants/IMAGES";
import Image from "next/dist/client/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import AdminStyle from "@styles/Admin.module.css";
import PropTypes from "prop-types";
import { Paper, Button, Grid, Accordion } from "@material-ui/core";
import Pagination from "@mui/material/Pagination";
// import Pagination from '@material-ui/lab/Pagination';
import Stack from "@mui/material/Stack";
// import Stack from "@material-ui/core/styles";
import Box from "@mui/material/Box";
// import Box from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Modal from "@material-ui/core/Modal";
import {
  makeStyles,
  createTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import adminUtil from "@utils/adminUtil";
import initFirebase from "@utils/initFirebase";
import { async } from "@firebase/util";
import { CompassCalibrationOutlined } from "@material-ui/icons";

const theme = createTheme({
  palette: {
    primary: {
      light: "#F0930D",
      main: "#F0930D",
      dark: "#F0930D",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#db4132",
      dark: "#ba000d",
      contrastText: "#fff",
    },
  },
});

const styleSeeMore = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 430,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const styleMoreInfo = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1366,
  height: 597,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const styleConfirmDeletePostModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 200,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function Admin(prop) {
  let counterReport;
  const [value, setValue] = useState("1");
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [currentReportPost, setCurrentReportPost] = useState([]);
  const [openSeeMoreModal, setOpenSeeMoreModal] = useState(false);
  const [openMoreInfoModal, setOpenMoreInfoModal] = useState(false);
  const [openConfirmDeletePostModal, setOpenConfirmDeletePostModal] =
    useState(false);
  const [selectReportPost, setSelectReportPost] = useState(-1);
  const [selectMoreInfoPost, setSelectMoreInfoPost] = useState(-1);
  const [selectDeletePost, setSelectDeletePost] = useState(-1);
  const [currentUser, setCurrentUser] = useState(null);
  const [reportPost, setReportPost] = useState([]);

  const handleChangePage = (event, value) => {
    setPage(value);
    console.log(value);
  };
  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const renderPageItems = () => {
    let store = [];
    let initIndex = (page - 1) * 5;

    if (currentReportPost == 1)
      if (reportPost.length < 1) {
        console.log("not found");
        return;
      }
    for (let i = initIndex; i < initIndex + 5 && i < reportPost.length; i++) {
      store.push(reportPost[i]);
    }
    setCurrentReportPost(store);
    console.log("store");
    console.log(store);
    console.log("-------------------");
  };

  useEffect(() => {
    renderPageItems();
  }, [reportPost, page]);

  //   useEffect(async () => {
  //     try {
  //        await renderPageItems();
  //         await sumValue();
  //     } catch (e) {
  //         console.error(e);
  //     }
  // }, [reportPost, page]);

  useEffect(() => {
    let res = initFirebase();
    if (res != false) {
      console.log("init firebase");
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          setCurrentUser(user);
          console.log(user);
          let reportPostObj = await adminUtil.getReportPost(user.uid);
          if (reportPostObj.data.result == true) {
            setReportPost(reportPostObj.data.searchResult);
            // console.log(reportPostObj.data.searchResult);
          } else {
            console.log("error handle");
          }
        } else {
          prop.setIsLogin(false);
        }
      });
    } else {
    }
  }, []);

  useEffect(() => {
    setMaxPage(Math.ceil(reportPost.length / 5));
  }, [currentReportPost]);

  useEffect(() => {
    if (page > maxPage) {
      console.log(currentReportPost);

      if (maxPage < 1) {
        setPage(1);
      } else {
        setPage(maxPage);
      }
    }
  }, [maxPage]);

  useEffect(() => {
    seeMore();
  }, [selectReportPost]);

  useEffect(() => {
    onMoreInfoModal();
  }, [selectMoreInfoPost]);

  useEffect(() => {
    onConfirmDeletePost();
  }, [selectDeletePost]);

  const seeMore = () => {
    if (selectReportPost != -1) {
      setOpenSeeMoreModal(true);
    }
  };

  const onMoreInfoModal = () => {
    if (selectMoreInfoPost != -1) {
      setOpenMoreInfoModal(true);
    }
  };

  const onConfirmDeletePost = () => {
    if (selectDeletePost != -1) {
      setOpenConfirmDeletePostModal(true);
    }
  };

  const handleCloseSeeMoreModal = () => {
    setOpenSeeMoreModal(false);
    setSelectReportPost(-1);
  };

  const handleCloseMoreInfoModal = () => {
    setOpenMoreInfoModal(false);
    setSelectMoreInfoPost(-1);
  };

  const handleCloseConfirmDeletePostModal = () => {
    setOpenConfirmDeletePostModal(false);
    setSelectDeletePost(-1);
  };

  const deleteReportPost = async () => {
    console.log("prop.userObject.data.searchResult.fbId");
    console.log(currentUser.uid);
    console.log(currentReportPost[selectDeletePost].postId);
    console.log(currentReportPost[selectDeletePost]);
    if (currentReportPost[selectDeletePost] != [] && currentUser != null) {
      let res = await adminUtil.deleteReportPost(
        currentUser.uid,
        currentReportPost[selectDeletePost].postId._id
      );
      if (res.data.result == true) {
        let currentReportPostInner = reportPost;
        currentReportPostInner.splice(reportPost[page - 1] * 5 + selectDeletePost, 1);
        setReportPost([...currentReportPostInner]);
        handleCloseConfirmDeletePostModal();
        console.log("delete from local success");
      } else {
        alert("data.result = false");
        console.log(res);
      }
    } else {
      console.log("error");
    }
  };

  const seeMoreModal = (
    <Modal
      open={openSeeMoreModal}
      onClose={handleCloseSeeMoreModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      // reason={currentReportPost[selectReportPost]}
    >
      <Box sx={styleSeeMore}>
        <p className="text-center">เหตุผลการรีพอร์ต</p>
        <div className="overflow-y-auto h-80 mt-6">
          {currentReportPost[selectReportPost]
            ? Object.entries(currentReportPost[selectReportPost].reason).map(
                ([key, value]) => {
                  return (
                    <p key={key}>
                      {key} {value}
                    </p>
                  );
                }
              )
            : "error"}
          <p>{reportPost.note}</p>
        </div>
      </Box>
    </Modal>
  );

  const moreInfoModal = (
    <Modal
      open={openMoreInfoModal}
      onClose={handleCloseMoreInfoModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styleMoreInfo}>
        <div className="overflow-y-auto h-80">
          {/* {currentReportPost[selectMoreInfoPost]
            ? Object.entries(currentReportPost[selectMoreInfoPost].postId.urls).map(
                ([key, item]) => {
                  return (
                    <div key={key}>
                      {console.log("---------------")}
                      {console.log(value)}
                    </div>
                  );
                }
              )
            : "error"} */}
        </div>
      </Box>
    </Modal>
  );

  const confirmDeletePostModal = (
    <Modal
      open={openConfirmDeletePostModal}
      onClose={handleCloseConfirmDeletePostModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styleConfirmDeletePostModal}>
        <div className="">
          <p className="text-center mt-2 text-lg ">Confirm Delete Post</p>
          <div className="flex justify-center mt-14 space-x-4">
            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                color="secondary"
                className=""
                onClick={deleteReportPost}
              >
                Delete
              </Button>
              <Button
                variant="contained"
                className="ml-12"
                onClick={handleCloseConfirmDeletePostModal}
              >
                Cancel
              </Button>
            </ThemeProvider>
          </div>
        </div>
      </Box>
    </Modal>
  );

  const sumValue = (reason) => {
    let reportCount = 0;
    Object.entries(reason).map(([key, value]) => {
      reportCount = reportCount + value;
    });
    return <p>{reportCount}</p>;
  };

  return (
    <div
      style={{ fontFamily: "Prompt" }}
      className={" mx-auto " + AdminStyle.bgImg}
    >
      <Head>
        <title>CatUs</title>
        <meta name="description" content="CatUs Service" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="2xl:flex 2xl:flex-wrap 2xl:justify-between 2xl:mx-64 pt-3">
        <Link href="/">
          <a>
            <h1 className="2xl:text-5xl 2xl:font-black 2xl:text-white 2xl:ml-16 2xl:mt-2">
              Catus<span className="2xl:text-base"> admin</span>
            </h1>
          </a>
        </Link>
      </header>
      <main>
        {openSeeMoreModal ? seeMoreModal : null}
        {openMoreInfoModal ? moreInfoModal : null}
        {openConfirmDeletePostModal ? confirmDeletePostModal : null}
        <section
          className="block-outer-head w-9/12 bg-white 2xl:h-36 mx-auto  rounded-t-2xl shadow-lg 2xl:mt-20"
          //   style={{ height: "880px" }}
        >
          <div className="2xl:absolute 2xl:ml-7 2xl:mt-12">
            <p className="dashboard-style 2xl:text-3xl 2xl:font-bold ">
              Dashboard
            </p>
          </div>
          <div
            className="dashboard-menu-style absolute "
            style={{ top: "245px" }}
          >
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChangeTab}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="Report post" value="1" />
                    <Tab label="Active" value="2" />
                  </TabList>
                </Box>
              </TabContext>
            </Box>
          </div>
        </section>
        <section
          className="2xl:w-9/12 mx-auto bg-gray-100 rounded-b-2xl shadow-lg 2xl:grid"
          style={{ height: "1000px" }}
        >
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <TabPanel value="1">
                <section>
                  <section
                    className="block-inner-head 2xl:w-4/5 bg-gray-50 2xl:h-36 mx-auto rounded-t-2xl shadow-lg 2xl:mt-16"
                    style={{ height: "95px" }}
                  >
                    <div className="header-style 2xl:grid 2xl:grid-cols-7 2xl:justify-items-stretch 2xl:gap-2 ">
                      <div className="post-style 2xl:col-span-3 2xl:m-7 2xl:mt-12">
                        Post
                      </div>

                      <div className="deleted-on-style 2xl:justify-self-center 2xl:m-7 2xl:mt-12">
                        Count
                      </div>
                      <div className="note-style 2xl:col-span-2 2xl:justify-self-center 2xl:m-7 2xl:mt-12">
                        Note
                      </div>
                      <div className="action-style 2xl:justify-self-center 2xl:m-7 2xl:mt-12">
                        Action
                      </div>
                    </div>
                  </section>
                  <section
                    className="block-inner-body 2xl:w-4/5 mx-auto bg-gray-100  shadow-lg 2xl:grid 2xl:grid-rows-5 2xl:gap-0.5"
                    style={{ height: "540px" }}
                  >
                    {currentReportPost != null
                      ? currentReportPost.map((item, i) => (
                          <div
                            key={i}
                            className="item-style bg-white 2xl:grid 2xl:grid-cols-7 2xl:justify-items-stretch 2xl:gap-2 "
                          >
                            <div className="grid grid-flow-col grid-cols-3 col-span-3 ">
                              <div
                                className="justify-self-center cursor-pointer "
                                onClick={() => setSelectMoreInfoPost(i)}
                              >
                                {item.postId.urls.length > 0 ? (
                                  <Image
                                    src={item.postId.urls[0].url}
                                    alt={item.postId.urls[0].fileName}
                                    width="110"
                                    height="107"
                                  />
                                ) : (
                                  <Image
                                    src={IMAGES.defaultCat}
                                    alt="defaultImageCat"
                                    width="110"
                                    height="107"
                                  />
                                )}
                              </div>
                              <div className="content-center   mx-3 grid col-span-3 text-sm ">
                                {/* {item.description.length < "93" ? item.description:"null"} */}
                                <div className="text-sm">
                                  <p>
                                    Date:{" "}
                                    {item.postId.date != ""
                                      ? item.postId.date
                                      : "-"}
                                  </p>
                                  <p>
                                    Sex:{" "}
                                    {item.postId.sex != ""
                                      ? item.postId.sex
                                      : "-"}
                                  </p>
                                  <p>
                                    Colar:{" "}
                                    {item.postId.collar ? "Have" : "Not Have"}
                                  </p>
                                  {/* <p>Description: {item.description != "" ? item.description.length : "-"}</p> */}
                                  <p>
                                    Description:{" "}
                                    {item.postId.description != ""
                                      ? item.postId.description.length >= 32
                                        ? item.postId.description.substring(
                                            0,
                                            30
                                          ) + "......"
                                        : item.postId.description
                                      : "-"}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="place-self-center ">
                              {sumValue(item.reason)}
                            </div>
                            <div
                              className="place-self-center col-span-2 text-sm text-blue-500 cursor-pointer"
                              onClick={() => setSelectReportPost(i)}
                            >
                              <p className="text-xs">ดูเพิ่มเติม</p>
                            </div>
                            <div className="place-self-center 2xl:relative">
                              <ThemeProvider theme={theme}>
                                <div className="2xl:absolute -top-8 -right-12">
                                  <IconButton aria-label="delete" size="medium">
                                    <p className="text-base text-gray-400">X</p>
                                  </IconButton>
                                </div>
                                <div className="">
                                  <IconButton
                                    aria-label="delete"
                                    color="secondary"
                                  >
                                    <DeleteIcon
                                      onClick={() => {
                                        setSelectDeletePost(i);
                                      }}
                                    />
                                  </IconButton>
                                </div>
                              </ThemeProvider>
                            </div>
                          </div>
                        ))
                      : null}
                  </section>
                  <section
                    className="block-inner-foot 2xl:w-4/5 bg-gray-50 2xl:h-36 mx-auto  rounded-b-2xl shadow-lg 2xl:flex 2xl:justify-end "
                    style={{ height: "95px" }}
                  >
                    <div>
                      <Stack spacing={2}>
                        <Pagination
                          className="page-number 2xl:mt-10 justify-center"
                          count={maxPage}
                          page={page}
                          onChange={handleChangePage}
                        />
                      </Stack>
                    </div>
                  </section>
                </section>
              </TabPanel>
              <TabPanel value="2">Item Two</TabPanel>
            </TabContext>
          </Box>
        </section>
      </main>
      <footer>
        <section
          className="footer-orange 2xl:flex 2xl:flex-col 2xl:justify-center 2xl:items-center 2xl:bg-mainBlue 2xl:mt-36"
          style={{ width: "100%", height: "259px" }}
        >
          <div className="2xl:flex 2xl:flex-wrap 2xl:gap-52">
            <div className="2xl:text-white">
              <p className="2xl:text-2xl">ติดต่อเรา</p>
              <p className="2xl:mt-1">+66 6071 2203</p>
              <p>catus_helpyou@sit.kmutt.ac.th</p>
              <p className="2xl:text-5xl 2xl:mt-2 2xl:font-black">Catus</p>
              <p className="2xl:text-gray-300">© Copyright 2021 CatUs</p>
            </div>
            <div className="2xl:text-white">
              <p className="2xl:text-2xl">สถานที่ทำการ</p>
              <p className="2xl:mt-1 2xl:-mb-1">
                Space Dragon 168 ซอยประชาอุทิศ 40 ถนนประชาอุทิศ แขวงบางมด
                เขตทุ่งครุ กรุงเทพมหานคร 10140
              </p>
              <p className="2xl:mt-20 2xl:text-gray-300">
                School of Information Technology, King Mongkut&apos;s University
                of Technology Thonburi
              </p>
            </div>
          </div>
        </section>
      </footer>
    </div>
  );
}