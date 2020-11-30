import { createGlobalStyle } from "styled-components"

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${props => props.theme.mainGrey};
    color: ${props => props.theme.mainBlack};
    font-display: swap;
    font-family: "Helvetica", sans-serif;
    font-size: 1rem;
    line-height: 1.0;
  }
  
  .my_body {
    min-height: 80vh;
    min-width: 50%;
    margin: 0 auto;
  }

  .paper_body{
    min-height: 90vh;
    min-width: 50%;
    margin: auto;
  }

  .behind_body {
  min-height: 100vh;
  justify-content: space-between;
  align-items: center;
  padding-top:45px;
  }

  .delete_button{
    position:relative;
    max-width:40px;
    left:90%;
    top:20px;
  }

  .person_delete_button_creator{
    position:relative;
    max-width:40px;
    left:97%;
  }

  .person_delete_button_show{
    position:relative;
    max-width:40px;
    left:92%;
    bottom:6px;
  }

  .person_edit_button{
    position:relative;
    left:75%;
    top:29%;
  }

  .show_name_person{
    height:100%;
    max-width:75%;
    text-align:center;
    position:relative;
    padding : 5px;
    bottom:3.6rem;
  }

  .person_name_inner{
    display: inline-block;
    vertical-align: middle;
    line-height: normal;
  }

  .form_activity_grid{
    position:relative;
  }
  
  .form_inner_grid{
    position:relative;
    top:15px;
  }

  .grid_name_activity{
    position:relative;
  }

  .edit_button{
    position:relative;
    left:75%;
    top:20px;
    z-index: 2;
  }

  .show_activity{
    position:relative;
    display: flex;
    text-align:center;
    max-width : 80%;
    height:100%
    bottom:15px;
  }

  #premade_activities{
    padding : 2rem;
  }

  #premade_profiles{
    padding : 2rem;
  }

  .calculator_presentation{
    width:100%;
    text-align: center;
  }

  .family_presentation{
    width:100%;
    text-align: center;
  }

  #calculator_result{
    text-align:center;
    padding:1rem;
  }

  #family_result{
    text-align:center;
  }

  #graph_result{
    padding-top:1.5rem;
  }

  .recharts_graph{
    margin:auto;
    max-width:400px;
  }

  #button_to_family{
    padding-top:1.5rem;
  }

  #text_graph_result{
    padding-top:1.5rem;
  }

  .addActivity_buttons{
    align-items: center;
    justify-content: space-between;
  }

  @media screen and (max-width: 576px){
    .risk_calculator{
      align-items: center;
      justify-content: space-between;
    }

    .behind_body{
      padding-top:30px;
    }

    #premade_activities{
      padding : 2rem;
      border-style: solid;
      border-radius: 16px;
      border-width:thin;
      margin:1rem;
    }

    #premade_profiles{
      padding : 2rem;
      border-style: solid;
      border-radius: 16px;
      border-width:thin;
      margin:1rem;
    }

    .paper_body{
      visibility: hidden;
    }

    .inside_body{
      visibility: visible;
    }

    .my_body{
      padding:0px 0px 0px 0px;
    }

  }

  @media screen and (min-width: 576px) {

    .inside_body{
      padding: 2rem 1rem 0 1rem;
      width:100%;
    }

    .activity_box{
      width: "20rem";
      height: "10rem";
      margin: "auto";
      padding: 0 0.5rem 0 0.5rem;
    }
  
    .risk_calculator{
      max-width: 100%;
      padding: 1rem;
    }
  
    .risk_form {
      justify-content: space-between;
      align-items: center;
    }

    .riskForm_container{
      display: flex;
    }

    .activity_list{
      position:relative;
    }
    
    .paper_body{
      width:50%;
    }

  }


  h1, h2, h3, h4, h5, h6 {
    font-family: "Impact", sans-serif;
    letter-spacing: ${props => props.theme.mainSpacing};
    font-display: swap;
    margin-bottom: 1.25rem;
  }

  p {
    margin-bottom: 1.25rem;
  }

  a {
    text-decoration: none;
    }

    .defaultHero {
        min-height: calc(100vh - 62px);
        background: linear-gradient(rgba(63, 208, 212, 0.7), rgba(0, 0, 0, 0.7)),
            url("../../static/images/index-hero.webp") center/cover no-repeat;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .btn-white,
    .btn-primary {
        text-transform: uppercase;
        letter-spacing: ${props => props.theme.mainSpacing};
        color: ${props => props.theme.mainWhite};
        border: 2px solid ${props => props.theme.mainWhite};
        padding: 0.9rem 1.6rem;
        display: inline-block;
        transition: ${props => props.theme.mainTransition};
        cursor: pointer;
    }

    .btn-white:hover {
        background: ${props => props.theme.mainWhite};
        color: ${props => props.theme.primaryColor};
    }

    .btn-primary {
        background: ${props => props.theme.primaryColor};
        color: ${props => props.theme.mainWhite};
        border: 2px solid ${props => props.theme.primaryColor};
    }

    .btn-primary:hover {
        background: transparent;
        color: ${props => props.theme.primaryColor};
    }

    main {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }
`
