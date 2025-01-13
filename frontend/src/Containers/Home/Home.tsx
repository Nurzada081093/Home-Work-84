import ToolBar from '../../Components/ToolBar/ToolBar.tsx';
import { Container, Typography } from '@mui/material';
import { Box } from '@mui/joy';

const Home = () => {
  return (
    <>
      <ToolBar/>
      <Container>
        <Box>
          <Typography variant="h1" component="h2" sx={{color: 'white', textAlign: 'center', margin: '20px 0'}}>
            Ваша мечта
          </Typography>
          <Box sx={{color: 'white', borderRadius: '10px', width: '70%', margin: '0 auto', fontSize: '20px', padding: '20px', backgroundColor: 'rgba(186,211,210,0.27)'}}>
            <div>Чтоб достичь свои цели нужно поставить рядзадач:</div>
            <ol>
              <li>Определение цели</li>
              <li>Анализ текущего состояния</li>
              <li>Создание плана действий</li>
              <li>Планирование времени</li>
              <li>Отслеживание прогресса</li>
              <li>Мотивация и поддержка</li>
              <li>Оценка результатов и т.д.</li>
            </ol>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Home;