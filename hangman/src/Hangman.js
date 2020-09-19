import React, { Component } from "react";
import { randomWord } from './words';
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    this.handleRestart = this.handleRestart.bind(this)
    this.generateButtons = this.generateButtons.bind(this)
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    if (this.state.guessed === this.state.answer) {
      this.setState({ isWin: true })
    }
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr, i) => (
      <button
        key={`${i}-${ltr}`}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        { ltr}
      </button >
    ));
  }

  handleRestart() {
    this.setState({
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord(),
    })
  }

  /** render: render game */
  render() {
    const isLose = this.state.nWrong >= this.props.maxWrong
    const isWin = this.guessedWord().join("") === this.state.answer
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img src={this.props.images[this.state.nWrong]} alt={`${this.state.nWrong} wrong guesses`} />
        <p className="Hangman-nWrong">Wrong Guess : {this.state.nWrong}</p>
        {!isLose
          ?
          <div>
            <p className='Hangman-word'>{this.guessedWord()}</p>
            {!isWin
              ? <p className='Hangman-btns'>{this.generateButtons()}</p>
              : <h1 className='Hangman-win'>You Win!</h1>
            }
          </div>
          :
          <div>
            <p className='Hangman-word'>{this.state.answer}</p>
            <h1 className='Hangman-lose'>You Lose!</h1>
            <h2 className="Hangman-rightAnswer">The answer is : {this.state.answer}</h2>
          </div>
        }
        <div>
          <button style={{ width: "100px" }} onClick={this.handleRestart}>Restart</button>
        </div>
      </div>
    );
  }
}

export default Hangman;
