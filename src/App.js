import React, {PureComponent} from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import BoardBlock from './components/BoardBlock/BoardBlock'
import InfoAboutTask from './components/InfoAboutTack/InfoAboutTask'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

const createNewArrayWithUniqueId = (taskId, array) => {
  const indexItem = array.map(item => item.id).indexOf(taskId);
  const startNewArray = array.slice(0,indexItem);
  const endNewArray = array.slice(indexItem + 1, array.length);
  endNewArray.forEach((item) => item['id'] -= 1);
  return [...startNewArray, ...endNewArray]
};

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      inputValue: '',
      isAddCard: false,
      isFocused: true,

      arrBacklog: {title: 'Backlog', isShowDropdown: false, isAddCard: false, isFocused: true, isShowBtn: true, task: {}},
      arrReady: {title: 'Ready', isShowDropdown: false, isAddCard: false, isShowBtn: true, isShowForm: false, task: {}},
      arrProgress: {title: 'In Progress', isShowDropdown: false, isAddCard: false, isShowBtn: true,  isShowForm: false, task: {}},
      arrFinished: {title: 'Finished', isShowDropdown: false, isAddCard: false, isShowBtn: true, isShowForm: false, task: {}},
      arrLogin: {title:'Login', isShow: false, issues: [{id: 0, taskName: 'My account'}, {id: 1, taskName: 'My tasks'}, {id: 2, taskName: 'Log out'}]},

      backlogTaskArray: [],
      readyTaskArray:[],
      progressTaskArray:[],
      finishedTaskArray:[],

    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleClick = (arr, nameOfHandle) => {
    if (arr) {
      if (nameOfHandle === 'visibleDropdownListLogin') arr.isShow = !arr.isShow;
      if (nameOfHandle === 'handleClickAndSetFocus') {
        arr.isAddCard = !arr.isAddCard;
        arr.isFocused = true;
      }
      if (nameOfHandle === 'handleClickAndBtnBlock') {
        arr.isAddCard = !arr.isAddCard;
        arr.isShowForm = !arr.isShowForm;
        arr.isShowDropdown = !arr.isShowDropdown;
        arr.isFocused = false
        arr.isShowBtn = !arr.isShowBtn
      }
      if (nameOfHandle === 'removeFocus') {
        console.log('click')
        arr.isShowDropdown = false;
        arr.isFocused = false;
      }
      this.setState(prevState => {
        return arr
      })
    }
  };

  handleInputChange = event => {
    this.setState({
      value: event.target.value,
    });
  };

  handleSubmit = (event, arr, nameOfHandle) => {
    event.preventDefault();
    const { value, backlogTaskArray, arrBacklog} = this.state;
    const timeCreateTask = new Date();

    this.setState({ value:'' });
    if(arr) arr["isFocused"] = true;
    this.setState(prevState => {
      return arr
    });

    if (value.length === 0 && arr) {
      arr.isAddCard = false;
      arr.isFocused = false;
      this.setState(prevState => { return arr })
    } else {
      let stored;
      stored = { id: backlogTaskArray.length , taskName: value, isDone: false, isAddCard: false, registrationTimeTask: timeCreateTask, description: 'description test'}
      backlogTaskArray.push(stored);
      localStorage.setItem('backlogTaskArray', JSON.stringify(backlogTaskArray))

      arrBacklog["task"] = backlogTaskArray;
      localStorage.setItem('Backlog', JSON.stringify(arrBacklog))
    }

    if(nameOfHandle === 'handleSubmitAndRemoveFocus') {
      arr.isAddCard = false;
      arr.isFocused = false;
      this.setState(prevState => {
        return arr
      })
    }

  }

  onSelectedTask = (taskId, registrationTimeTask, nameOfTask) => {
    const { backlogTaskArray, arrBacklog, readyTaskArray, arrReady, progressTaskArray, arrProgress, finishedTaskArray, arrFinished} = this.state
    let currentTaskArray = [];
    let currentArr = [];
    let nextArr = [];
    if (nameOfTask === 'backlogTaskArray') {
      currentTaskArray = backlogTaskArray;
      currentArr = arrBacklog;
      nextArr = arrReady;
    }
    if (nameOfTask === 'readyTaskArray') {
      currentTaskArray = readyTaskArray;
      currentArr = arrReady;
      nextArr = arrProgress;
    }
    if (nameOfTask === 'progressTaskArray') {
      currentTaskArray = progressTaskArray;
      currentArr = arrProgress;
      nextArr = arrFinished;
    }
    const currentNameTask = currentTaskArray[taskId].taskName;
    const updatedArray = createNewArrayWithUniqueId(taskId, currentTaskArray);

    localStorage.setItem(`${nameOfTask}`, JSON.stringify(updatedArray));
    currentArr["task"] = updatedArray;
    localStorage.setItem(`${nextArr.title}`, JSON.stringify(currentArr));

    if (nameOfTask === 'backlogTaskArray') {
      const timeChangeTask = new Date();
      arrReady.isShowDropdown = false;
      arrReady.isAddCard = true;
      arrReady.isShowForm = false;
      arrReady.isShowBtn = true;
      this.setState({
        inputValue: currentNameTask,
        backlogTaskArray: updatedArray,
        arrBacklog: arrBacklog,
      });

      let readyStored = [];
      readyStored = { id: readyTaskArray.length , taskName: currentNameTask, isDone: false, isAddCard: false, registrationTimeTask: registrationTimeTask, registrationTimeChangeTask: timeChangeTask, description: 'description test' }

      readyTaskArray.push(readyStored);
      localStorage.setItem('readyTaskArray', JSON.stringify(readyTaskArray));

      arrReady["task"] = readyTaskArray;
      localStorage.setItem('Ready', JSON.stringify(arrReady))
    }
    if (nameOfTask === 'readyTaskArray') {
      const timeChangeTask = new Date();
      arrProgress.isShowDropdown = false;
      arrProgress.isAddCard = true;
      arrProgress.isShowForm = false;
      arrProgress.isShowBtn = true;
      this.setState({
        inputValue: currentNameTask,
        readyTaskArray: updatedArray,
        arrProgress: arrProgress,
      });

      let progressStored = [];
      progressStored = { id: progressTaskArray.length , taskName: currentNameTask, isDone: false, isAddCard: false,registrationTimeTask: registrationTimeTask, registrationTimeChangeTask: timeChangeTask, description: 'description test' }

      progressTaskArray.push(progressStored);
      localStorage.setItem('progressTaskArray', JSON.stringify(progressTaskArray));

      arrProgress["task"] = progressTaskArray;
      localStorage.setItem('In Progress', JSON.stringify(arrProgress))
    }
    if (nameOfTask === 'progressTaskArray') {
      const timeChangeTask = new Date();
      arrFinished.isAddCard = true;
      arrFinished.isShowDropdown = false;
      arrFinished.isShowForm = false;
      arrFinished.isShowBtn = true;
      this.setState({
        inputValue: currentNameTask,
        progressTaskArray: updatedArray,
        arrFinished: arrFinished,
      });

      let finishedStored = [];
      finishedStored = { id: finishedTaskArray.length , taskName: currentNameTask, isDone: false, isAddCard: false, registrationTimeTask: registrationTimeTask, registrationTimeChangeTask: timeChangeTask,  description: 'description test' }

      finishedTaskArray.push(finishedStored)
      localStorage.setItem('finishedTaskArray', JSON.stringify(finishedTaskArray));

      arrFinished["task"] = finishedTaskArray;
      localStorage.setItem('Finished', JSON.stringify(arrFinished))
    }
  }

  handleInputCurrentValue = () => {
    const {inputValue} = this.state;
    this.setState({
      inputValue: inputValue,
    })
  }


  createLocalStorage(nameOfTaskArray) {
    return localStorage.getItem(`${nameOfTaskArray}`) ? JSON.parse(localStorage.getItem(`${nameOfTaskArray}`)) : []
  }

  componentDidMount() {
  let {arrBacklog, arrReady, arrProgress, arrFinished} = this.state;

    const backlogTaskArray =  this.createLocalStorage('backlogTaskArray');
    arrBacklog["task"] = backlogTaskArray

    const readyTaskArray = this.createLocalStorage('readyTaskArray');
    arrReady["task"] = readyTaskArray

    const progressTaskArray = this.createLocalStorage('progressTaskArray');
    arrProgress["task"] = progressTaskArray

    const finishedTaskArray = this.createLocalStorage('finishedTaskArray');
    arrFinished["task"] = finishedTaskArray

    this.setState({backlogTaskArray, readyTaskArray, progressTaskArray, finishedTaskArray, arrBacklog, arrReady, arrProgress, arrFinished})
  }

  render() {
    const {value, arrBacklog, arrReady, arrProgress, arrFinished, arrLogin} = this.state;
    const activeTask = arrBacklog["task"].length > 0 && arrBacklog["task"].length ? arrBacklog["task"].length : 0;
    const finishedTask = arrFinished["task"].length > 0 && arrFinished["task"].length ? arrFinished["task"].length : 0;
    console.log(this.state, 'tyt')
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Header arrLogin={arrLogin} onClick={() => this.handleClick(arrLogin, 'visibleDropdownListLogin')}/>
            <BoardBlock
              arrBacklog={arrBacklog}
              onSubmitValueInInputArrBacklog={e => this.handleSubmit(e, arrBacklog)}
              valueArrBacklog={value}
              onChangeInputArrBacklog={this.handleInputChange}
              onBlurInputArrBacklog={e => this.handleSubmit(e, arrBacklog, 'handleSubmitAndRemoveFocus')}
              onClickButtonArrBacklog={() => this.handleClick(arrBacklog, 'handleClickAndSetFocus')}

              arrReady={arrReady}
              onClickFormArrReady={() => this.handleClick(arrReady, 'handleClickAndBtnBlock')}
              onSubmitValueInInputArrReady={this.handleInputCurrentValue}
              onChangeInputArrReady={this.handleInputChange}
              onClickButtonArrReady={() => this.handleClick(arrReady, 'handleClickAndBtnBlock')}
              onSelectedTaskArrReady={(taskId, registrationTimeTask) => this.onSelectedTask(taskId, registrationTimeTask, 'backlogTaskArray')}

              arrProgress={arrProgress}
              onClickFormArrProgress={() => this.handleClick(arrProgress, 'handleClickAndBtnBlock')}
              onSubmitValueInInputArrProgress={this.handleInputCurrentValue}
              onChangeInputArrProgress={this.handleInputChange}
              onClickButtonArrProgress={() => this.handleClick(arrProgress, 'handleClickAndBtnBlock')}
              onSelectedTaskArrProgress={(taskId, registrationTimeTask) => this.onSelectedTask(taskId, registrationTimeTask, 'readyTaskArray')}


              arrFinished={arrFinished}
              onClickFormArrFinished={() => this.handleClick(arrFinished, 'handleClickAndBtnBlock')}
              onSubmitValueInInputArrFinished={this.handleInputCurrentValue}
              onChangeInputArrFinished={this.handleInputChange}
              onClickButtonArrFinished={() => this.handleClick(arrFinished, 'handleClickAndBtnBlock')}
              onSelectedTaskArrFinished={(taskId, registrationTimeTask) => this.onSelectedTask(taskId, registrationTimeTask, 'progressTaskArray')}
            />
            <Footer activeTask={activeTask} finishedTask={finishedTask}/>
          </Route>
          <Route path="/backlog">
            <Header arrLogin={arrLogin} onClick={() => this.handleClick(arrLogin, 'visibleDropdownListLogin')}/>
            <div className="block">
              <InfoAboutTask arrayCurrent={arrBacklog}/>
            </div>
            <Footer activeTask={activeTask} finishedTask={finishedTask}/>
          </Route>
          <Route path="/ready">
            <Header arrLogin={arrLogin} onClick={() => this.handleClick(arrLogin, 'visibleDropdownListLogin')}/>
            <div className="block">
              <InfoAboutTask arrayCurrent={arrReady}/>
            </div>
            <Footer activeTask={activeTask} finishedTask={finishedTask}/>
          </Route>
          <Route path="/in progress">
            <Header arrLogin={arrLogin} onClick={() => this.handleClick(arrLogin, 'visibleDropdownListLogin')}/>
            <div className="block">
              <InfoAboutTask arrayCurrent={arrProgress}/>
            </div>
            <Footer activeTask={activeTask} finishedTask={finishedTask}/>
          </Route>
          <Route path="/finished">
            <Header arrLogin={arrLogin} onClick={() => this.handleClick(arrLogin, 'visibleDropdownListLogin')}/>
            <div className="block">
              <InfoAboutTask arrayCurrent={arrFinished}/>
            </div>
            <Footer activeTask={activeTask} finishedTask={finishedTask}/>
          </Route>
            <Route path="*">
              <Header arrLogin={arrLogin} onClick={() => this.handleClick(arrLogin, 'visibleDropdownListLogin')}/>
              <div className="block">
                <div>404</div>
              </div>
              <Footer activeTask={activeTask} finishedTask={finishedTask}/>
            </Route>
        </Switch>
      </Router>
    );
  }
}

export default App