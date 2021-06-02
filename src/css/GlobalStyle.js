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
    font-family: "Roboto"
    font-size: 1rem;
    line-height: 1.0;
  }

  .centered{
    display:block;
    margin-left:auto;
    margin-right:auto;
    width:155px;
    height:155px;
  }

  .svg_container{
    margin : 0.5em;
    padding: 1em;
    background-color: white;
    box-shadow: 0px 0px 2px darkgray;
    height:300px;
  }

  .logo{
    position:relative;
    left:10px;
    top:11px;
  }

  .boldOrBlue{
    font-weight:500;
  }

  #parameters_result{
    display:flex;
    align-items: center;
  }

  .my_body {
    min-height: 80vh;
    min-width: 60%;
    margin: 0 auto;
  }

  .paper_body{
    min-height: 90vh;
    min-width: 60%;
    margin: auto;
    padding-bottom : 20px;
  }

  .behind_body {
  min-height: 100vh;
  justify-content: space-between;
  align-items: center;
  padding-top:45px;
  padding-bottom:45px;
  }

  .scenario_container{
    line-height:1.5em;
    padding:7px;
    font-size:1.3em;
    text-align:center;
    margin:auto;
    width:80%;
    border-style: solid;
    border-radius: 16px;
    border-width:thin;
  }

  .scenario_bilan{
    padding-bottom:0.2em;
    font-size:1.2em;
    font-weight:500;
  }

  .arrow{
    margin-top:0.5em;
    text-align:center;
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
    top:31%;
  }

  .show_name_person{
    height:100%;
    max-width:75%;
    position:relative;
    vertical-align:middle;
    padding : 5px;
    bottom:3.6rem;
  }

  .person_name_inner{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
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

  .Math{
    width:100%;
    text-align:center;
    font-weight: 500;
    margin : 1rem auto 1rem auto;
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
    text-align: center;
    font-size: 1.3em;
    border-style: solid;
    border-radius: 16px;
    border-width:thin;
    margin:1rem;
  }

  #premade_profiles{
    padding : 2rem;
  }

  .calculator_presentation{
    width:100%;
    font-size:1.4em;
    text-align: center;
    margin-bottom : 2rem;
  }

  .home_presentation{
    width:100%;
    text-align:center;
  }

  .home_body{
    width:90%;
    margin:auto;
    padding-bottom:1rem;
    text-align:center;
  }

  .home_container{
    width:100%;
    text-align:left;
  }

  .home_button{
    text-align: center;
  }

  .home_subtitle{
    font-size:1.1em;
    font-weight:500;
    display:flex;
    align-items:center;
    padding-bottom:5px;
  }

  .text_icon_home{
    font-size:1.1em;
    font-weight:500;
  }

  .home_option{
  } 

  .calculator_introduction{
    font-size:0.9em;
    width:80%;
    margin: 2rem auto;
    padding:1rem;
    background-color : #E0ECFA;
    font-weight:450;
    line-height: 1.4;
    border-style: solid;
    border-width: medium;
    border-color: #9AC8FE;
  }

  .home_introduction{
    width:80%;
    margin: 2rem auto;
    padding:5px;
    background-color : #E0ECFA;
    font-weight:450;
    line-height: 1.4;
    border-style: solid;
    border-width: medium;
    border-color: #9AC8FE;
  }

  .explanation_test{
    text-align : center;
    font-size:1em;
    width:80%;
    margin: 2rem auto;
    padding:1rem;
    background-color : #DEFFE1;
    font-weight:450;
    line-height: 1.4;
    border-style: solid;
    border-width: medium;
    border-color: #7CBB82;
  }

  .whitepaper_presentation{
    width:100%;
    text-align: center;
  }

  .whitepaper{
    font-size:20px;
    margin : 30px 80px 20px 80px;
    text-align:justify;
  }

  .home_background{
    font-size:20px;
    margin : 20px 80px 20px 80px;
  }

  .center_gray{
    background-color: #EBE9E4;
    border-radius: 16px;
    padding:1rem;
    margin: 20px 10px 20px 10px;
    font-size: 1.4em;
    text-align:center;
  }

  .disclaimer{
    font-size:1.2em;
    border-style: solid;
    border-width: medium;
    border-color: orange;
    padding : 15px;
    background-color: #FCEBC1;
    text-align:left;
  }

  .family_presentation{
    width:100%;
    text-align: center;
  }
  
  .recharts_wrapper {
    margin : 0 auto;
    height:500px;
    width:600px;
    align-items: center;
  }

  #calculator_result{
    text-align:center;
    font-size:1.1em;
    line-height:1.6;
    padding:1rem;
  }

  #family_result{
    text-align:center;
    border-style: solid;
    border-radius: 16px;
    border-width:thin;
  }

  .calculator_risk_display{
    text-align:center;
    border-style: solid;
    border-radius: 16px;
    border-width:thin;
  }

  .result_cases{
    margin:1rem 1rem 2rem 1rem;
    align-items:center;
    text-align : center;
  }

  .result_cases_top{
    font-size:2.5rem;
    font-weight: bold;
  }

  .result_cases_bottom{

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
    font-weight:500;
  }

  .addActivity_buttons{
    align-items: center;
    justify-content: space-between;
  }

  .showMyRisk{
    align-items: center;
    justify-content: space-between;
    margin-top:5px;
  }

  .green-dot{
    height: 9px;
    width: 9px;
    background-color: #82ca9d;
    border-radius: 50%;
    display: inline-block;
    margin-right:4px;
  }

  .yellow-dot{
    height: 9px;
    width: 9px;
    background-color: #F8E716;
    border-radius: 50%;
    display: inline-block;
  }

  .orange-dot{
    height: 9px;
    width: 9px;
    background-color: orange;
    border-radius: 50%;
    display: inline-block;
  }

  .red-dot{
    height: 9px;
    width: 9px;
    background-color: red;
    border-radius: 50%;
    display: inline-block;
  }
  
  .seir_image{
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 80%;
  }

  @media screen and (max-width: 1080px){
    .recharts_wrapper {
      margin : 0 auto;
      height:300px;
      width:350px;
      align-items: center;
    }
  }

  @media screen and (max-width: 576px){
    .visible_except_mobile{
      display: none;
    }

    .boldOrBlue{
      color:blue;
    }

    .calculator_presentation{
      margin-top:15px;
    }

    .text_icon_home{
      position:relative;
      bottom:7px;
    }
    
    .icon_home{
      position:relative;
      top:5px;
    }

    .home_introduction{
      width:90%;
      font-size:0.9em;
    }

    .home_body{
      width:100%;
      text-align:center;
    }
    
    .whitepaper_presentation{
      display:none;
    }

    .calculator_presentation
    {
      font-size:1.2em;
    }

    .logo_mobile {
      position:relative;
      left:16px;
      top:11px;
    }

    .logo{
      display:none;
    }

    .translate_non_mobile{
      display:none;
    }

    .translate_mobile{
      position:absolute;
      left:270px;
      top:36px;
    }

    .seir_image{
      display: block;
      margin-left: auto;
      margin-right: auto;
      width: 100%;
    }

    body{
      background-color: #FAF9F7;
    }

    .risk_calculator{
      align-items: center;
      justify-content: space-between;
    }

    .whitepaper{
      font-size:16px;
      margin : 30px;
      text-align : justify;
    }

    h2{
      text-align:center;
      padding-left:5px;
      padding-right:5px;
    }

    .behind_body{
      padding-top:0px;
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
    .visible_mobile_only{
      display: none;
    }

    .logo_mobile{
      display:none;
    }

    .translate_mobile{
      display:none;
      z-index:2000;
    }

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

    .profile_container{
      justify-content: space-between;
      align-items: center;
      height:29rem;
    }

    .riskForm_container{
      display: flex;
    }

    .profile_container{
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
    margin-bottom: 1.25rem;
  }

  p {
    text-indent: 1.5em;
    margin-bottom: 1.25rem;
  }

  a {
    text-decoration: none;
    }
  
    a:visited{
      color:blue;
    }

    a:hover{
      color:red;
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
