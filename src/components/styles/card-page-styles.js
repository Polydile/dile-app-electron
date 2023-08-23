import { css } from 'lit';

export const cardPageStyles = css`
  :host {
      display: block;
      padding: 0 0.6rem;
      text-align: center;
      --dile-card-text-align: left;
      --dile-card-border: none;
      --dile-card-background-color: transparent;
  }
  h1 {
      margin: 1.5 1rem 1rem;
  }
  @media (min-width: 400px) {
      :host {
          padding: 0.6rem 1.5rem 1rem;
          display: block;
          text-align: center;
          --dile-card-text-align: left;
          --dile-card-border: 1px solid #ddd;
          --dile-card-background-color: #fff;
          --dile-card-box-shadow: 0 1px 6px 0 rgba(0,0,0,.05), 0 1px 4px 0 rgba(0,0,0,.03);
      }
      dile-card {
          margin: 0 auto;
          max-width: 400px;
      }
  }
`;