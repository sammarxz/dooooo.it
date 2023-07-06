export function Home() {
  return (
    <div>
      <form action="">
        <div>
          <label htmlFor="task">I&apos;m going to work on</label>
          <input
            type="text"
            id="task"
            list="task-suggestions"
            placeholder="Name your project"
          />

          <datalist id="task-suggestions">
            <option value="Project 1" />
            <option value="Project 2" />
            <option value="Project 3" />
          </datalist>

          <label htmlFor="minutesAmount">for</label>
          <input
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
          />

          <span>minutes.</span>
        </div>

        <div>
          <span>0</span>
          <span>0</span>
          <span>:</span>
          <span>0</span>
          <span>0</span>
        </div>

        <button type="submit">Start</button>
      </form>
    </div>
  )
}
