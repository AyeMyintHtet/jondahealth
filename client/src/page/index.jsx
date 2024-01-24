import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Select from 'react-select';
import Swal from 'sweetalert2'
import makeAnimated from 'react-select/animated';
import { RiDeleteBinLine } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { StyledHome } from '../theme'
import TextCom from '../component/TextCom'
import { CreateLanguage, GetAllLanguages } from '../store/language';
import { DeleteRecords, GetAllRecord, PostRecord, UpdateRecord } from '../store/record';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const buttonStyle = {
  marginTop: '10px',
  border: '1px solid black',
  padding: '10px 5px',
  borderRadius: '10px',
  cursor: 'pointer',
  width: '100px'
}
const bgStyle = {
  marginTop: '10px',
  border: '1px solid black',
  padding: '10px 5px',
  borderRadius: '10px',
  cursor: 'pointer',
  width: '100px',
  background: 'black',
  color: '#fff'
}
const Home = () => {
  const [open, setOpen] = React.useState(false);
  const [language, setLanguage] = useState("")
  const [addRecord, setAddRecord] = useState({
    name: "",
    category: "",
    language: []
  })
  const [chosenRecord, setChosenRecord] = useState([]);
  const [data, setData] = useState([]);
  const [langData, setLangData] = useState([])
  const [opening, setOpening] = useState("")

  const handleOpen = () => { setOpen(true) };
  const handleClose = () => {
    setAddRecord({
      name: "",
      category: "",
      language: "",
      languageId: ''
    })
    setOpen(false)
  };
  const animatedComponents = makeAnimated();

  const CallApi = async () => {
    let res = await GetAllRecord()
    if (res?.length > 0) setData(res);
    let resLang = await GetAllLanguages()
    if (resLang?.length > 0) {
      let options = []
      resLang.map((item, id) => {
        options.push({ value: item.id, label: item.name })
      })
      setLangData(options)
    }
  }

  useEffect(() => {
    CallApi()
  }, [])

  const SubmitLanguage = async () => {
    if (language.length < 1) {
      handleClose()
      return Toast.fire({
        icon: "error",
        title: "Please Fill All Fields to Save"
      });
    }
    let obj = {
      name: language
    }
    let res = await CreateLanguage(obj);
    CallApi()
    handleClose()
    Swal.fire({
      title: "Success",
      text: "Language Successfully Created!",
      icon: "success"
    });
  }
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
  const SubmitRecord = async () => {
    if (addRecord.name.length < 1 || addRecord.category.length < 1 || addRecord.language === undefined) {
      handleClose()
      return Toast.fire({
        icon: "error",
        title: langData.length > 0 ? "Please Fill All Fields to Save" : 'Please Create Language To Create Record'
      });

    }
    let chooseLang = []
    let obj = {
      ...addRecord, pageCount: 1
    }
    addRecord.language.forEach((item) => {
      chooseLang.push(item.value)
    })
    obj.languageId = chooseLang
    if (opening === 'update') {
      await UpdateRecord(obj, chosenRecord.id)
    } else {
      await PostRecord(obj);
    }
    CallApi()
    handleClose()
  }
  const CompileUpdateField = (value) => {
    setAddRecord({
      name: value.name,
      category: value.category
    })
    setChosenRecord(value)
  }
  const DeleteRecord = async (item) => {
    Swal.fire({
      title: `Do you want to delete ${item.name}?`,
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Submit",
      denyButtonText: `Don't save`
    }).then(async (result) => {
      if (result.isConfirmed) {
        await DeleteRecords(null, item.id)
        await CallApi()
        Swal.fire("Successfully Deleted!", "", "success");
      }
    });
  }
  return (
    <StyledHome className='container-fluid'>
      <TextCom as='h1' color='black'>List of All Recorded Lists</TextCom>
      <div className="w-100 d-flex justify-content-end gap-3 mb-3" >
        <div className="create-button" onClick={() => [handleOpen(), setOpening('record')]}>
          <CiCirclePlus /> Create Record
        </div>
        <div className="create-button" onClick={() => [handleOpen(), setOpening('language')]}>
          <CiCirclePlus /> Create Language
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          {
            data.length > 0 ?
              data.map((item, index) => (
                <div className="col-md-3 mb-3" key={index}>
                  <div className="record-box w-100">
                    <div className="opacity-layer">
                      <div className="d-custom for-button">
                        <div className="button-style" onClick={() => [CompileUpdateField(item), setOpening('update'), handleOpen()]}>
                          <CiEdit size={30} color='green' />
                        </div>
                        <div className="button-style" onClick={async () => [await DeleteRecord(item)]}>
                          <RiDeleteBinLine color='red' size={30} />
                        </div>
                      </div>
                    </div>
                    <div className="d-custom">
                      <TextCom>Name :</TextCom>
                      <TextCom>{item.name}</TextCom>
                    </div>
                    <div className="d-custom">
                      <TextCom>Category :</TextCom>
                      <TextCom>{item.category}</TextCom>
                    </div>
                    <div className="d-custom">
                      <TextCom>Languages : </TextCom>
                      <TextCom align='left'>{item.language.name}</TextCom>
                    </div>
                  </div>
                </div>
              ))
              :
              <div className='d-flex justify-content-center align-items-center h-100'>
                <TextCom as='h2' color='black'>There is No data please create one</TextCom>
              </div>
          }
        </div>
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>


            <Typography id="modal-modal-title" variant="h6" component="h2">
              Fill the form to {opening === 'update' ? 'Update' : 'Create'} {opening === 'record' || opening === 'update' ? 'Record' : 'Language'}!
            </Typography>
            {opening === 'record' || opening === 'update' ?
              <>
                <div className="d-flex flex-column justify-content-between align-items-start mt-3">
                  <label>Record Name:</label>
                  <input value={addRecord.name} type="text" onChange={(e) => setAddRecord({ ...addRecord, name: e.target.value })} style={{ width: '100%' }} />
                </div>
                <div className="d-flex flex-column justify-content-between align-items-start mt-3">
                  <label>Category:</label>
                  <input value={addRecord.category} type="text" onChange={(e) => setAddRecord({ ...addRecord, category: e.target.value })} style={{ width: '100%' }} />
                </div>
                <div className="d-flex flex-column justify-content-between align-items-start mt-3">
                  <label>Choose Language:</label>
                  <div className="w-100">
                    <Select
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      isMulti
                      options={langData}
                      onChange={(e) => setAddRecord({ ...addRecord, language: e })}
                    />
                  </div>
                </div>
              </>
              :
              <>
                <div className="d-flex flex-column justify-content-between align-items-start mt-3">
                  <label>New Language Name:</label>
                  <input type="text" onChange={(e) => setLanguage(e.target.value)} style={{ width: '100%' }} />
                </div>
              </>
            }
            <div className="w-100 d-flex justify-content-end gap-3">
              <div className="custom-button" style={buttonStyle} onClick={() => { opening === 'record' || opening === 'update' ? SubmitRecord() : SubmitLanguage() }}>
                Submit
              </div>
              <div className="custom-button" style={bgStyle} onClick={handleClose}>
                Cancel
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </StyledHome>
  )
}

export default Home